import { Injectable, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private isBrowser: boolean;
  private scrollPosition = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
  }

  getScrollPosition(): number {
    return this.scrollPosition;
  }

  isScrolled(offset = 50): boolean {
    return this.isBrowser && this.scrollPosition > offset;
  }

  scrollToElement(elementId: string, offset = 80): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
