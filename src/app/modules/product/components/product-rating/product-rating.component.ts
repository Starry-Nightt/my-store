import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss'],
})
export class ProductRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() showNumber: boolean = false;
  maxStar = 5;
  stars: boolean[] = [];

  constructor() {}

  ngOnInit() {
    const rated =
      Math.floor(this.rating) +
      (this.rating - Math.floor(this.rating) >= 0.5 ? 1 : 0);

    const unrated = this.maxStar - rated;
    for (let i = 0; i < rated; i++) this.stars.push(true);
    for (let i = 0; i < unrated; i++) this.stars.push(false);
  }

  get rated() {
    return Math.floor(this.rating * 10) / 10;
  }
}
