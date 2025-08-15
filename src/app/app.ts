import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

// Components
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { TypologiesComponent } from './components/typologies/typologies.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LocationComponent } from './components/location/location.component';
import { ContactComponent } from './components/contact/contact.component';

// Models
import { Hero, Typology, ContactFormData } from './models/landing-page.model';

// Services
import { ScrollService } from './services/scroll.service';
import { IntersectionObserverService } from './services/intersection-observer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    TypologiesComponent,
    GalleryComponent,
    LocationComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [ScrollService, IntersectionObserverService]
})
export class App implements OnInit {
  // App configuration
  readonly projectName = "Mira' Douro";
  readonly location = "Oliveira do Douro, Vila Nova de Gaia";
  readonly currentYear = new Date().getFullYear();
  readonly googleMapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.1234567890123!2d-8.123456789012345!3d41.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA3JzI0LjQiTiA4wrAwNyczNi4zIlc!5e0!3m2!1sen!2spt!4v1234567890123!5m2!1sen!2spt';
  
  // State
  isSubmitting = false;
  showPrivacyModal = false;
  
  // Form data
  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  };

  // Navigation links
  readonly navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#porque', label: 'Porquê Nós' },
    { href: '#tipologias', label: 'Tipologias' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#localizacao', label: 'Localização' },
    { href: '#contactos', label: 'Contactos' }
  ];

  // Hero section
  readonly hero: Hero = {
    title: "Novo empreendimento de luxo com vista Douro",
    subtitle: "Qualidade, conforto e uma vista de cortar a respiração.",
    cta: "Marcar visita"
  };

  // Features section
  readonly features = [
    'Vista direta para o rio Douro',
    'Acabamentos premium (opção standard e premium)',
    'Certificação energética A',
    'Garagem e arrecadação por fração',
    'Proximidade a escolas, comércio e serviços',
    'Acesso rápido à Ponte do Infante e centro do Porto'
  ];

  // Typologies section
  readonly tipologias: Typology[] = [
    {
      tipo: 'T1',
      area: '45m²',
      preco: 'A partir de 200.000€',
      descricao: ['Cozinha equipada', '1 quarto', '1 casa de banho', 'Varanda']
    },
    {
      tipo: 'T2',
      area: '75m²',
      preco: 'A partir de 300.000€',
      descricao: ['Cozinha equipada', '2 quartos', '2 casas de banho', 'Varanda', 'Vista rio']
    },
    {
      tipo: 'T3',
      area: '100m²',
      preco: 'A partir de 400.000€',
      descricao: ['Cozinha equipada', '3 quartos', '2 casas de banho', 'Varanda alargada', 'Vista rio', 'Lareira']
    }
  ];

  // Gallery images
  readonly galleryImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1557&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1557&q=80',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  ];

  constructor(
    private scrollService: ScrollService,
    private intersectionService: IntersectionObserverService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  /**
   * Handles form submission
   */
  async onFormSubmit(formData: ContactFormData): Promise<void> {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init('QZ_n6OpGvyvsZu5MM');
      
      // Send email using EmailJS
      await emailjs.send(
        'service_ru8fpvl',      // EmailJS Service ID
        'template_j6wiioo',     // EmailJS Template ID
        {
          to_email: 'jbarbosa47@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'Nova mensagem do formulário de contacto',
          message: formData.message
        }
      );
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      };
      
      // Show success message
      alert('A sua mensagem foi enviada com sucesso! Entraremos em contacto brevemente.');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
    } finally {
      this.isSubmitting = false;
    }
  }
  
  /**
   * Resets the contact form
   */
  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false
    };
  }
  
  /**
   * Scrolls to the contact section
   */
  scrollToContact(): void {
    this.scrollService.scrollToElement('contactos');
  }
  
  /**
   * Opens the privacy policy modal
   */
  openPrivacyModal(): void {
    this.showPrivacyModal = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }
  
  /**
   * Closes the privacy policy modal
   */
  closePrivacyModal(): void {
    this.showPrivacyModal = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Accepts the privacy policy
   */
  acceptPrivacy(): void {
    this.formData.privacy = true;
    this.closePrivacyModal();
  }
  
  /**
   * Sets up intersection observer for scroll animations
   */
  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
      this.intersectionService.observe(element, (entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });
  }
  
  /**
   * Tracks items in the *ngFor loop for better performance
   */
  trackByFn(index: number, item: any): any {
    return item.tipo || index;
  }
}