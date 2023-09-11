import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subscription, fromEvent, throttleTime } from 'rxjs';
import { ProductService } from './services/product.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'my-store';
  showButton = false;
  scrollSubscription: Subscription;
  isLoading$: Observable<boolean>;

  @ViewChild('head') head: ElementRef<HTMLDivElement>;
  @ViewChild('scrollTopButton') button: ElementRef<HTMLButtonElement>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.isLoading$ = this.loaderService.loading$;
    this.scrollSubscription = fromEvent(document, 'scroll')
      .pipe()
      .subscribe(() => {
        if (window.scrollY >= 600) this.showButton = true;
        else this.showButton = false;
      });
  }

  ngAfterViewInit(): void {
    if (this.button?.nativeElement) {
      fromEvent(this.button.nativeElement, 'click')
        .pipe(throttleTime(2000))
        .subscribe(() => {
          this.onScrollToTop();
        });
    }
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  onScrollToTop() {
    this.head.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
