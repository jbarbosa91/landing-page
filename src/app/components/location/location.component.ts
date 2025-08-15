import { Component, Input, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IntersectionObserverService } from '../../services/intersection-observer.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit {
  @Input() location: string = '';
  @Input() googleMapsEmbedUrl: string = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7641.556426533935!2d-8.5843112213148!3d41.12651394703486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464aeea16f3d7%3A0xb443696715423740!2sCampo%20Oliveira%20do%20Douro!5e1!3m2!1sen!2spt!4v1755267382275!5m2!1sen!2spt';
  
  private intersectionObserverService = inject(IntersectionObserverService);
  private sanitizer = inject(DomSanitizer);
  
  get safeMapsUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.googleMapsEmbedUrl);
  }

  // Initialize intersection observer for animations
  ngAfterViewInit(): void {
    this.intersectionObserverService.observeElements(
      '.location-content',
      (element: Element) => {
        element.classList.add('active');
      },
      { threshold: 0.1 }
    );
  }
}
