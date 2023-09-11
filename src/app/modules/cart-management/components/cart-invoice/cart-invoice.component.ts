import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-cart-invoice',
  templateUrl: './cart-invoice.component.html',
  styleUrls: ['./cart-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartInvoiceComponent implements OnInit {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<MatCheckboxChange>();
  @Output() paid = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<boolean>();

  @Input() checkedQuantity: number;
  @Input() totalProducts: number;
  @Input() totalPayment: number;

  constructor() {}

  ngOnInit() {}

  onCheck(event: MatCheckboxChange) {
    this.checkedChange.emit(event);
  }

  get st() {
    console.log('render');
    return true;
  }

  onPaid() {
    this.paid.emit(true);
  }

  onRemove() {
    this.remove.emit(true);
  }
}
