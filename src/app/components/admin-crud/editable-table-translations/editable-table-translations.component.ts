import { Component, Input, EventEmitter } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Translation, Language } from '../../../models/data.model'; 
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table-translations',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editable-table-translations.component.html',
  styleUrl: './editable-table-translations.component.css'
})

export class EditableTableTranslationComponent {
  @Input() languages: Language[] = [];

  public isDialogOpen: boolean = false; 
  
  showAll: boolean = false;
  initialDisplayCount = 10;
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  errorMessage: string | null = null;

  translations: Translation[] = [];
  form: FormGroup;
  editForm: FormGroup;
  editingTranslation: Translation | null = null;



  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      sourceLanguage: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
      targetLanguage: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
    });
    this.editForm = this.fb.group({
      sourceText: ['', [Validators.required, Validators.maxLength(100)]],
      translatedText: ['', [Validators.required, Validators.maxLength(100)]],
      sourceLanguage: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
      targetLanguage: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
    });
    this.loadTranslations(); 
  }

  ngOnInit(): void {
    this.adminService.reloadTranslations$.subscribe(() => {
      this.loadTranslations(); 
    });
  }

  
  loadTranslations() {
    const { sourceLanguage, targetLanguage } = this.form.value; 
    this.adminService.getTranslations(sourceLanguage, targetLanguage).subscribe({
      next: (translations) => {
        this.translations = translations;
        console.log('Translation:', this.translations);
      },
      error: (err) => {
        console.error('Error fetching translation:', err);
      },
    });
  }

  sortTable(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
  
    this.translations.sort((a: Translation, b: Translation) => {
      let valueA = a[key as keyof Translation];
      let valueB = b[key as keyof Translation];
  
      if (key === 'createdAt') {
        const dateA = new Date(valueA as string);
        const dateB = new Date(valueB as string);
  
        return this.sortDirection === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
  
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  startEditing(translation: Translation) {
    this.isDialogOpen = true;
    this.editingTranslation = translation;
  
    this.editForm.patchValue({
      sourceText: translation.sourceText,
      translatedText: translation.translatedText,
      sourceLanguage: this.getLanguageCode(translation.sourceLanguage),
      targetLanguage: this.getLanguageCode(translation.targetLanguage),
    });
  
    document.body.classList.add('no-scroll');
  }

  closeDialog(): void {        
    this.isDialogOpen = false;
    this.editingTranslation = null;
    document.body.classList.remove('no-scroll');
  }
  
  saveEdit() {
    if (this.editForm.valid && this.editingTranslation) {
      const updatedTranslation = this.editForm.value;

      this.adminService.updateTranslation(this.editingTranslation._id, updatedTranslation).subscribe({
        next: (updated) => {
          console.log('Updated translation:', updated);
          this.loadTranslations(); 
          this.closeDialog();
          this.errorMessage = null; 
        },
        error: (err) => {
          console.error('Update translation error:', err);
          this.errorMessage = 'Error while updating the translation. Please try again.';
        },
      });
    }else {
      this.errorMessage = 'Please fill out all fields correctly before saving.';
    }
  }

  getLanguageCode(languageName: string): string {
    console.log('Avaiable languages:', this.languages);
    
    const language = this.languages.find(
      (lang) => lang.name === languageName || lang.code === languageName
    );
    return language ? language.code : '';
  }
  
  deleteTranslation(id: string)  {
    this.adminService.deleteTranslation(id).subscribe({
      next: () => {
        console.log(`Translation with ID ${id} was removed.`);
        this.loadTranslations(); 
      },
      error: (err) => {
        console.error('Error while deleting translation:', err);
      },
    });
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
  
}