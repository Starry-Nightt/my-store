import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  hints: string[] = [
    'Áo sơ mi nam',
    'Khăn quàng mùa đông',
    'Đồng hồ unisex',
    'Quần âu nam nữ',
  ];
  filteredHints: Observable<string[]>;

  searchCtrl = new FormControl('');

  constructor() {}

  ngOnInit() {
    this.filteredHints = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      map((key) => this.filterByKey(key))
    );
  }

  onSearch() {
    console.log(this.searchCtrl.value);
  }

  private filterByKey(key: string) {
    const _key = key.toLowerCase().trim();
    return this.hints.filter((hint) =>
      hint.toLowerCase().trim().includes(_key)
    );
  }
}
