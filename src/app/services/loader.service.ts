import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  constructor() {}

  showSpinner() {
    this.loading.next(true);
  }

  hideSpinner() {
    this.loading.next(false);
  }
}
