# -------------------------------
# AUTHOR
# -------------------------------
# Pavol Holes
# 2024
#
# -------------------------------
# DESCRIPTION
# -------------------------------
# This PowerShell script is intended to be used on the Web server where it will deploy new IIS Application pool and new WebApp to be used by application running on Angular.
#
# Prerequisite software
#   - install IIS Web server role with below additional features to the default installation:
#       - Web server > Common HTTP Features > HTTP Redirection
#       - Web Server > Performance > Dynamic Content Compression
#       - Web Server > Security > Basic Authentication; Windows Authentication
#       - Web Server > Application Development > .NET Extensibility 4.6; ASP.NET 4.6; CGI; ISAPI Extensions; ISAPI Filters
#   - install IIS URL Rewrite from: [https://www.iis.net/downloads/microsoft/url-rewrite]
#
# Installation procedure:
#   - copy directory for the Frontend application to a custom location i.e: [d:\scripts\NGO_Naruc\ngo_naruc_project_fe]
#   - open PowerShell x64 as Administrator and execute this script with command (update the path accordingly):
#		& d:\scripts\NGO_Naruc\ngo_naruc_project_fe\installToIIS-fe.ps1
#   - open Frontend UI: [http://localhost/ngo_naruc_project_fe/]
#
# ===============================
# CONFIGURATION VARIABLES
# ===============================
#
# WebApplication name
$WebAppName = "ngo_naruc_project_fe"
# Frontent location of built files in dist sub-folder relative to current folder
$distSubfolder = ""
# allow longer GET urls "system.webServer/security/requestFiltering/maxQueryString" (default 2048)
$maxQueryStringValue = 4096

#--------- DO NOT EDIT BELOW THIS LINE -----------
try {
    $ErrorActionPreference="Stop"
    Set-ExecutionPolicy Bypass -Scope Process

    # Function for logging to file 
    function log {
        Param(
            [Parameter(Mandatory=$True, HelpMessage="log text", ValueFromPipeline)] $lt,
            [Switch] $h, #header
            [Switch] $d  #no date
        )
        $high = ""
        if ($h){
            $strg = "["+(get-date).tostring("yyyy-MM-dd HH:mm:ss")+"]     " + $lt + "     "
            for ($i = 0; $i -lt $strg.length; $i++){$high = $high + "-"}
            $strg = "`r`n"+ $high +"`r`n"+ $strg + "`r`n"+ $high + "`r`n"
        } elseif ($d) {
            $strg = $lt
        } else {
            $strg = "["+(get-date).tostring("HH:mm:ss")+"]     " + $lt
        }
        Write-Host $strg
        Add-Content $global:logpath $strg

        $global:ilog += $strg+"`r`n"
    }

    # Function to remove all custom variables 
    function RemoveAllCustomVariables {
        Param()
        # Invoke a new instance of PowerShell, get the built-in variables, then remove everything else that doesn't belong.
        $ps = [PowerShell]::Create()
        $ps.AddScript('Get-Variable | Select-Object -ExpandProperty Name') | Out-Null
        $builtIn = $ps.Invoke()
        $ps.Dispose()
        $builtIn += "profile","psISE","psUnsupportedConsoleApplications" # keep some ISE-specific stuff
    }
    
    # Function to test if the current process is run as administrator
    function Test-ProcessElevated() {
        Param(        
        )
	    $identity  = [System.Security.Principal.WindowsIdentity]::GetCurrent()
	    $principal = New-Object System.Security.Principal.WindowsPrincipal($identity)
	    return $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
    }
    
    if (-not (Test-ProcessElevated)) {
	    throw 'This PowerShell script must be run from a PowerShell process that is running as administrator.'
    }

    $PSScriptBaseName = $MyInvocation.MyCommand.Name

    # Get the script path
    $ScriptPath = Switch ($Host.name){
        "Visual Studio Code Host" { split-path $psEditor.GetEditorContext().CurrentFile.Path }
        "Windows PowerShell ISE Host" {  Split-Path -Path $psISE.CurrentFile.FullPath }
        "ConsoleHost" { $PSScriptRoot }
    }

    # Logging to file
    $global:ilog=""
    $global:logPath = ($ScriptPath + "\" + $PSScriptBaseName + "-debug.log")

    #rename .log to .old.log when it reach 3MB. Note: this will overwrite .old.log file so all will be automaintained.
    if (((Get-Item $logPath -ErrorAction SilentlyContinue).length/1Mb) -gt 3) { Move-Item $logPath -Destination "$PSScriptBaseName-debug.old.log" -Force }

    log "$WebAppName install script execution has started" -h

    log "[INFO] Script location: [$ScriptPath]"
    log "[INFO] Script name: [$PSScriptBaseName]"
    $workingDir = $(pwd).Path
    log "[INFO] Current working directory: [$workingDir]"
    if ($workingDir -ne $ScriptPath) {
        log "[INFO] Changing PowerShell work directory from [$workingDir] to [$ScriptPath]."
        try {
            & cd $ScriptPath
        } catch {
            throw
        }
        $workingDir = $(pwd).Path
        if ($workingDir -ne $ScriptPath) {
            throw "Failed to change PowerShell work directory from [$workingDir] to [$ScriptPath]!"
        } else {
            log "[INFO] Current working directory: [$workingDir]"
        }
    }
   
    log "[INFO] Creating new IIS Application Pool [$WebAppName]..."
    $newWebAppPool = New-WebAppPool -Name $WebAppName
    log "[INFO] Done."

    log "[INFO] Creating new WebApplication [$WebAppName] under site [Default Web Site] with path [$ScriptPath$distSubfolder] and using Application Pool [$($newWebAppPool.name)]..."
    $newWebApp = New-WebApplication -Name $WebAppName -Site "Default Web Site" -PhysicalPath "$ScriptPath$distSubfolder" -ApplicationPool $($newWebAppPool.name)
    log "[INFO] Done."

    log "$WebAppName install script finished successfully" -h

} catch {
    log "[ERROR] SCRIPT ERROR!"
    log "Returned error message:`r`n $($_.Exception.ToString())" -d
    log "Script finished with error" -h
    break
} Finally {
    RemoveAllCustomVariables
}

