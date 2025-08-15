import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavLink } from '../../models/landing-page.model';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  activeLink = '';

  navLinks: NavLink[] = [
    { href: '#inicio', label: 'Início' },
    { href: '#porque', label: 'Porquê Nós' },
    { href: '#tipologias', label: 'Tipologias' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#localizacao', label: 'Localização' },
    { href: '#contactos', label: 'Contactos' }
  ];

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
      window.addEventListener('scroll', () => this.checkScroll());
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  private checkScroll(): void {
    this.isScrolled = this.scrollService.isScrolled();
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }
}
