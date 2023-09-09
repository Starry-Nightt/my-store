import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResponsive]',
})
export class ResponsiveDirective implements OnInit {
  isMobileScreen$: Observable<boolean>;
  isTabletScreen$: Observable<boolean>;
  isLowResolutionDesktopScreen$: Observable<boolean>;
  isMediumResolutionDesktopScreen$: Observable<boolean>;
  isHighResolutionDesktopScreen$: Observable<boolean>;

  screenClass = ['mobile', 'tablet', 'low-pc', 'md-pc', 'high-pc'];
  originalClass: string = this.elementRef?.nativeElement?.classList?.value;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.isMobileScreen$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((res) => res.matches));
    this.isTabletScreen$ = this.breakpointObserver
      .observe(Breakpoints.Small)
      .pipe(map((res) => res.matches));
    this.isLowResolutionDesktopScreen$ = this.breakpointObserver
      .observe(Breakpoints.Medium)
      .pipe(map((res) => res.matches));
    this.isMediumResolutionDesktopScreen$ = this.breakpointObserver
      .observe(Breakpoints.Large)
      .pipe(map((res) => res.matches));
    this.isHighResolutionDesktopScreen$ = this.breakpointObserver
      .observe(Breakpoints.XLarge)
      .pipe(map((res) => res.matches));
    combineLatest([
      this.isMobileScreen$,
      this.isTabletScreen$,
      this.isLowResolutionDesktopScreen$,
      this.isMediumResolutionDesktopScreen$,
      this.isHighResolutionDesktopScreen$,
    ]).subscribe((res) => {
      const idx = res.findIndex((item) => !!item);
      if (idx === -1) return;
      const _class = `${this.screenClass[idx]} ${this.originalClass}`;
      this.renderer.setProperty(
        this.elementRef?.nativeElement,
        'classList',
        _class
      );
    });
  }
}
