import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type CallbackFunction = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService implements OnDestroy {
  private observer: IntersectionObserver | null = null;
  private callbacks = new Map<Element, CallbackFunction>();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initObserver();
  }

  private initObserver(): void {
    if (!this.isBrowser) return;

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          const callback = this.callbacks.get(entry.target);
          if (callback) {
            callback(entry, observer);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
  }

  observe(element: Element, callback: CallbackFunction): void {
    if (!this.isBrowser || !this.observer) return;

    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    if (!this.isBrowser || !this.observer) return;

    this.observer.unobserve(element);
    this.callbacks.delete(element);
  }

  /**
   * Observe multiple elements matching a selector and apply a callback when they intersect
   * @param selector CSS selector for elements to observe
   * @param callback Callback function to execute when elements intersect
   * @param options IntersectionObserver options (optional)
   */
  observeElements(
    selector: string, 
    callback: (element: Element) => void, 
    options?: IntersectionObserverInit
  ): void {
    if (!this.isBrowser) return;
    
    // Create a new observer for this specific set of elements
    const elementObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          // Stop observing after the first intersection
          observer.unobserve(entry.target);
        }
      });
    }, options || {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    // Find and observe all matching elements
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      elementObserver.observe(element);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.callbacks.clear();
    }
  }
}
