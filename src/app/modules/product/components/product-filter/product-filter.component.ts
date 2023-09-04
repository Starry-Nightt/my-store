import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable, debounceTime } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { MAX_PRICE, MIN_PRICE } from '../../product.const';
import { ProductFilterPayload } from '../../product-interface';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<string[]>;
  step = 100;

  form = this.fb.group({
    categories: [],
  });

  @Output() formComplete: EventEmitter<ProductFilterPayload> =
    new EventEmitter<ProductFilterPayload>();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.categories$ = this.productService.getAllCategories();
    this.productService.searchKey$.asObservable().subscribe(() => {
      this.form.setValue({
        categories: [],
      });
    });
    this.onSubmit();
    this.detectValueChange();
  }

  onSubmit() {
    const filter: ProductFilterPayload = {
      categories: this.form.get('categories').value
        ? this.form.get('categories').value
        : [],
    };
    this.formComplete.emit(filter);
  }

  detectValueChange() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      this.onSubmit();
    });
  }

  onSelectCategories(event: MatSelectionListChange) {
    const selectedCategories = event.source.selectedOptions.selected.map(
      (item) => item.value
    );
    this.form.get('categories').setValue(selectedCategories);
  }
}
