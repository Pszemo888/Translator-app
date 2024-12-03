import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Translation } from '../../../models/data.model'; 
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './read-transtations.component.html',
  styleUrl: './read-transtations.component.css'
})

export class ReadTranstationsComponent {
  public isDialogOpen: boolean = false; // Właściwość publiczna
  
  translations: Translation[] = [];

  form: FormGroup;
  editForm: FormGroup;

  editingTranslation: Translation | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      sourceLanguage: [''],
      targetLanguage: [''],
    });
    this.editForm = this.fb.group({
      sourceText: ['', Validators.required],
      translatedText: ['', Validators.required],
      sourceLanguage: ['', Validators.required],
      targetLanguage: ['', Validators.required],
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
  
  startEditing(translation: Translation) {
    this.isDialogOpen = true;
    this.editingTranslation = translation;
    this.editForm.patchValue(translation); // Ustaw wartości w formularzu edycji
  }

  closeDialog(): void {         // Metoda publiczna
    this.isDialogOpen = false;
    this.editingTranslation = null;
  }
  // Zapisz zmiany w edytowanym tłumaczeniu
  saveEdit() {
    if (this.editForm.valid && this.editingTranslation) {
      const updatedTranslation = this.editForm.value;

      this.adminService.updateTranslation(this.editingTranslation._id, updatedTranslation).subscribe({
        next: (updated) => {
          console.log('Zaktualizowano tłumaczenie:', updated);
          this.loadTranslations(); // Odśwież listę po aktualizacji
          this.closeDialog();
        },
        error: (err) => {
          console.error('Błąd podczas aktualizacji tłumaczenia:', err);
        },
      });
    }
  }
  
  deleteTranslation(id: string)  {
    this.adminService.deleteTranslation(id).subscribe({
      next: () => {
        console.log(`Tłumaczenie o ID ${id} zostało usunięte.`);
        this.loadTranslations(); // Odswież listę po usunięciu
      },
      error: (err) => {
        console.error('Błąd podczas usuwania tłumaczenia:', err);
      },
    });
  }
 
}