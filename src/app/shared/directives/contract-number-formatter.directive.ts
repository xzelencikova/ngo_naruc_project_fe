import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appContractNumberFormatter]',
})
export class ContractNumberFormatterDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');

    // Insert hyphen after first 2 digits
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2, 6);
    }

    // Update form control value without emitting event loop
    this.control.control?.setValue(value, { emitEvent: false });
  }
}
