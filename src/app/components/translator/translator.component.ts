import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { UserService } from '../../services/user.service';
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
  languages: { code: string; name: string; nativeName: string }[] = []; 
  translatedText: string = '';
  isValidTranslation: boolean = true;

  constructor(private fb: FormBuilder, private translationService: TranslationService, private userService: UserService) {
    this.form = this.fb.group({
      sourceText: ['', Validators.required],
      sourceLanguage: ['', Validators.required],
      targetLanguage: ['', Validators.required],
    });

    this.loadLanguages(); 
  }

  loadLanguages() {
    this.translationService.getLanguages().subscribe({
      next: (langs) => {
        this.languages = langs; 
      },
      error: (err) => {
        console.error('Error fetching languages', err);
      },
    });
  }

  translate() {
    if (this.form.valid) {
      const { sourceText, sourceLanguage, targetLanguage } = this.form.value;
      const request = { sourceText, sourceLanguage, targetLanguage };
  
      const authToken = localStorage.getItem('authToken');

      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
      };
  
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
  
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
  
    this.form.patchValue({
      sourceLanguage: targetLanguage,
      targetLanguage: sourceLanguage,
      sourceText: this.translatedText || '', 
    });
  
    this.translatedText = '';
    this.isValidTranslation = true;
  }
}
