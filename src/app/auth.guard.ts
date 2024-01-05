import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtDecode } from 'jwt-decode';

export class AuthService {
    private tokenKey = 'token';
  
    isTokenExpired(token: string): boolean {
      if (token) {
        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    
            return decodedToken.exp < currentTime;
          } catch (error) {
            // Handle decoding errors (e.g., invalid token format)
            console.error('Error decoding token:', error);
            return true; // Assume expired if there's an error
          }
      }
      return true; // Return true if token is expired or not present
    }
  }


export const authGuard: CanActivateFn = (route, state) => {
    const authService = new AuthService();
    const router = inject(Router);
    const token = localStorage.getItem("token");
    if (token && !authService.isTokenExpired(token)) {
        return true;
    }
    else {
        router.navigate(['login']);
        return false;
    }
}