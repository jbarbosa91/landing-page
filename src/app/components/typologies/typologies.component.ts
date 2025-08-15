import { Component, Input, OnChanges, SimpleChanges, inject, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Typology } from '../../models/landing-page.model';
import { ScrollService } from '../../services/scroll.service';
import { IntersectionObserverService } from '../../services/intersection-observer.service';

@Component({
  selector: 'app-typologies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typologies.component.html',
  styleUrls: ['./typologies.component.scss']
})
export class TypologiesComponent implements OnChanges, AfterViewInit {
  @Input() typologies: Typology[] = [];
  @ViewChildren('typologyCard') typologyCards!: QueryList<ElementRef>;
  
  private scrollService = inject(ScrollService);
  private intersectionObserver = inject(IntersectionObserverService);
  
  ngAfterViewInit(): void {
    // Set up intersection observer for reveal animations
    this.typologyCards.forEach((card, index) => {
      this.intersectionObserver.observe(
        card.nativeElement,
        (entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        }
      );
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typologies'] && this.typologies) {
      // Typologies data received and processed
    }
  }
  
  trackByFn(index: number, item: Typology): string {
    return item.tipo;
  }

  scrollToContact(): void {
    this.scrollService.scrollToElement('contactos');
  }
}
