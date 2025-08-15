import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() images: string[] = [];
  
  // Track by function for better performance
  trackByFn(index: number, item: string): string {
    return `${index}-${item}`;
  }
}
