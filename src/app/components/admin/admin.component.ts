//import { Component } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService} from '../../services/admin.service';
import { Translation } from '../../models/data.model'; 
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  translations: Translation[] = [];

  form: FormGroup;


  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      sourceLanguage: [''],
      targetLanguage: [''],
    });

    this.loadTranslations(); // Pobierz wszystkie tłumaczenia przy starcie
  }

  // Pobierz tłumaczenia z opcjonalnymi filtrami
  loadTranslations() {
    const { sourceLanguage, targetLanguage } = this.form.value; // Pobierz dane z formularza
    this.adminService.getTranslations(sourceLanguage, targetLanguage).subscribe({
      next: (translations) => {
        this.translations = translations;
        console.log('Pobrane tłumaczenia:', this.translations);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania tłumaczeń:', err);
      },
    });
  }

}
