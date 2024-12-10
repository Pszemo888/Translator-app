import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent {
  form: FormGroup;
  languages: { code: string; name: string; nativeName: string }[] = []; // <- Deklaracja tej właściwości
  translatedText: string = '';

  constructor(private fb: FormBuilder, private translationService: TranslationService) {
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

  // Funkcja do tłumaczenia
  translate() {
    if (this.form.valid) {
      const { sourceText, sourceLanguage, targetLanguage } = this.form.value;
      const request = { sourceText, sourceLanguage, targetLanguage };

      this.translationService.translateText(request).subscribe({
        next: (response) => {
          this.translatedText = response.translatedText;
        },
        error: (err) => {
          console.error('Błąd podczas tłumaczenia:', err);
        },
      });
    }
  }
  swapLanguages() {
    const sourceLanguage = this.form.get('sourceLanguage')?.value;
    const targetLanguage = this.form.get('targetLanguage')?.value;
    const sourceText = this.form.get('sourceText')?.value;
  
    this.form.patchValue({
      sourceLanguage: targetLanguage,
      targetLanguage: sourceLanguage,
      sourceText: this.translatedText,
    });
  
    this.translatedText = '';
  }
}
