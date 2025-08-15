import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../models/landing-page.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() hero!: Hero;
  @Input() scrollToContact!: () => void;
  
  backgroundImage!: SafeStyle;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    // Usar caminho absoluto para a imagem
    const imagePath = '/assets/oliveira.jpg';
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url('${imagePath}')`);
  }

}
