import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ContactFormData } from '../../models/landing-page.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() projectName: string = '';
  @Input() location: string = '';
  @Input() isSubmitting: boolean = false;
  @Input() formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  };
  
  @Output() formSubmit = new EventEmitter<ContactFormData>();
  @Output() privacyModalOpen = new EventEmitter<void>();
  
  // Form submission handler
  onSubmit(contactForm: NgForm): void {
    if (contactForm.valid && this.formData.privacy) {
      this.formSubmit.emit(this.formData);
    }
  }
  
  // Open privacy modal
  openPrivacyModal(event: Event): void {
    event.preventDefault();
    this.privacyModalOpen.emit();
  }
  
  // Scroll to contact section
  scrollToContact(): void {
    const element = document.getElementById('contactos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
