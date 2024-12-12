import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { UserService } from '../../services/user.service';
import { Translation } from '../../models/data.model';
import { TranslationResponse } from '../../services/translation.service';
import { HighlightDirective } from '../../directives/highlight.directive';
@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HighlightDirective],
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent {
  form: FormGroup;
  languages: { code: string; name: string; nativeName: string }[] = []; // <- Deklaracja tej właściwości
  translatedText: string = '';
  isValidTranslation: boolean = true;

  constructor(private fb: FormBuilder, private translationService: TranslationService, private userService: UserService) {
    this.form = this.fb.group({
      sourceText: ['', Validators.required],
      sourceLanguage: ['', Validators.required],
      targetLanguage: ['', Validators.required],
    });

    this.loadLanguages(); // Załaduj języki podczas inicjalizacji komponentu
  }

  // Pobierz dostępne języki
  loadLanguages() {
    this.translationService.getLanguages().subscribe({
      next: (langs) => {
        this.languages = langs; // Przypisanie języków do właściwości languages
      },
      error: (err) => {
        console.error('Błąd podczas pobierania języków:', err);
      },
    });
  }

  // translate() {
  //   if (this.form.valid) {
  //     const { sourceText, sourceLanguage, targetLanguage } = this.form.value;
  //     const request = { sourceText, sourceLanguage, targetLanguage };
  
  //     // Definiowanie nagłówków
  //     const headers = {
  //       'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  //       'Content-Type': 'application/json'
  //     };
  
  //     this.translationService.translateText(request, headers).subscribe({
  //       next: (response: TranslationResponse) => {
  //         this.translatedText = response.translatedText;
  
  //         const newTranslation: Translation = {
  //           _id: response._id,
  //           sourceText: response.sourceText,
  //           translatedText: response.translatedText,
  //           sourceLanguage: response.sourceLanguage,
  //           targetLanguage: response.targetLanguage,
  //           createdAt: new Date().toISOString()
  //         };
  //       },
  //       error: (err) => {
  //         console.error('Translation error:', err);
  //         this.translatedText = 'Translation error occurred';
  //       }
  //     });
  //   }
  // }

  translate() {
    if (this.form.valid) {
      const { sourceText, sourceLanguage, targetLanguage } = this.form.value;
      const request = { sourceText, sourceLanguage, targetLanguage };
  
      // Pobieranie tokenu z localStorage
      const authToken = localStorage.getItem('authToken');
  
      // Definiowanie nagłówków
      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
      };
  
      // Dodawanie nagłówka Authorization, jeśli token istnieje
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
  
      // Wysyłanie żądania
      this.translationService.translateText(request, headers).subscribe({
        next: (response: TranslationResponse) => {
          this.translatedText = response.translatedText;
          this.isValidTranslation = true;
        },
        error: (err) => {
          console.error('Translation error:', err);
          this.translatedText = '';
          this.isValidTranslation = false;
        }
      });
    }
  }
  
  
  swapLanguages() {
    const sourceLanguage = this.form.get('sourceLanguage')?.value;
    const targetLanguage = this.form.get('targetLanguage')?.value;
    const sourceText = this.form.get('sourceText')?.value;
  
    // Allow swapping languages even with empty fields
    this.form.patchValue({
      sourceLanguage: targetLanguage,
      targetLanguage: sourceLanguage,
      sourceText: this.translatedText || '', // Use empty string if translatedText is empty
    });
  
    // Reset translated text and validation state
    this.translatedText = '';
    this.isValidTranslation = true;
  }
}
