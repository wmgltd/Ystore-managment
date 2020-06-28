import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[nullValue]'
})
export class NullDefaultValueDirectiveDirective {

  constructor(private el: ElementRef, private control: NgControl) { }
  @HostListener('input', ['$event.target'])
  onEvent(target: HTMLInputElement){
    if(target.value === '')
    this.control.control.patchValue(null);
  }
}
