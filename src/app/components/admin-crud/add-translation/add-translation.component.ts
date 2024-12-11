import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Translation } from '../../../models/data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-translation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.css']
})
export class AddTranslationComponent {
  @Output() translationAdded = new EventEmitter<Translation>(); // Emituj zdarzenie po dodaniu
  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      sourceText: ['', Validators.required],
      translatedText: ['', Validators.required],
      sourceLanguage: ['', Validators.required],
      targetLanguage: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const newTranslation = this.form.value;

      this.adminService.addTranslation(newTranslation).subscribe({
        next: (translation) => {
          console.log('Dodano tłumaczenie:', translation);
          this.translationAdded.emit(translation); // Emituj zdarzenie do rodzica
          this.form.reset(); // Resetuj formularz po udanym dodaniu
          this.adminService.triggerReloadTranslations();
        },
        error: (err) => {
          console.error('Błąd podczas dodawania tłumaczenia:', err);
        },
      });
    }
  }
}
