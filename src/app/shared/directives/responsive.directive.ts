import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appResponsive]',
})
export class ResponsiveDirective implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(1);
  }
}
