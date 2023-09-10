import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]',
})
export class OnlyNumberDirective {
  numberKey = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  otherKey = ['ArrowRight', 'ArrowLeft', 'Backspace'];
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent>event;
    const key = e.key;
    if (!this.numberKey.includes(key) && !this.otherKey.includes(key))
      e.preventDefault();
  }
}
