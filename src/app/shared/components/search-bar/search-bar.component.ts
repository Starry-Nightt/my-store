import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  hints: string[] = ['Mobile', 'Shirt', 'Watch', 'Men'];
  filteredHints: Observable<string[]>;

  searchCtrl = new FormControl('');

  @ViewChild('searchbar', { static: true })
  searchBar: ElementRef<HTMLDivElement>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.filteredHints = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      map((key) => this.filterByKey(key))
    );
  }

  onSearch() {
    this.productService.searchKey$.next(this.searchCtrl.value);
  }

  filterByKey(key: string) {
    const _key = key.toLowerCase().trim();
    return this.hints.filter((hint) =>
      hint.toLowerCase().trim().includes(_key)
    );
  }
}
