import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value);
  }
}
