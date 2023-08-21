import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  throttleTime,
  Observable,
  fromEvent,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
})
export class InfiniteListComponent implements OnInit, AfterViewInit, OnDestroy {
  throttleTime = 300;
  scroll$: Subscription;

  @Input() hasMore = false;
  @Output() scrolled = new EventEmitter<boolean>(false);

  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scroll$ = fromEvent(window, 'scroll')
      .pipe(throttleTime(this.throttleTime))
      .subscribe(() => this.handleScroll());
  }

  handleScroll() {
    const scrollHeight = this.container.nativeElement.scrollHeight;
    const scrollY = window.scrollY;
    const viewHeight = window.innerHeight;
    if (scrollY + viewHeight >= 0.9 * scrollHeight && this.hasMore)
      this.scrolled.emit(true);
    this.scrolled.emit(false);
  }

  ngOnDestroy() {
    this.scroll$.unsubscribe();
  }
}
