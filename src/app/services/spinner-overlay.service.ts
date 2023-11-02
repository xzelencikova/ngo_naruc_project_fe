
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerWrapperComponent } from '../components/spinner-wrapper/spinner-wrapper.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerWrapperComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}