import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  fromEvent,
  take,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'my-store';
  showButton = false;
  scrollSubscription: Subscription;

  @ViewChild('head') head: ElementRef<HTMLDivElement>;
  @ViewChild('scrollTopButton') button: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {
    this.scrollSubscription = fromEvent(document, 'scroll')
      .pipe()
      .subscribe(() => {
        if (window.scrollY >= 600) this.showButton = true;
        else this.showButton = false;
      });
  }

  ngAfterViewInit(): void {
    fromEvent(this.button.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => {
        this.onScrollToTop();
      });
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  onScrollToTop() {
    this.head.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
