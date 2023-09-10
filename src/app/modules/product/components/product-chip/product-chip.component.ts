import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-chip',
  templateUrl: './product-chip.component.html',
  styleUrls: ['./product-chip.component.scss'],
})
export class ProductChipComponent implements OnInit {
  @Input() content: string;

  constructor() {}

  ngOnInit() {}
}
