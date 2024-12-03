import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Translation } from '../../../models/data.model';

@Component({
  selector: 'app-edit-translation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-translation.component.html',
  styleUrl: './edit-translation.component.css'
})
export class EditTranslationComponent {
  @Input() translation!: Translation; 

  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      sourceText: ['', Validators.required],
      translatedText: ['', Validators.required],
      sourceLanguage: ['', Validators.required],
      targetLanguage: ['', Validators.required],
    });
  }
  ngOnChanges(): void {
    if (this.translation) {
      this.form.patchValue(this.translation); 
    }
  }
  submit(): void {
    if (this.form.valid && this.translation) {
      const updatedTranslation = this.form.value;

      this.adminService.updateTranslation(this.translation._id, updatedTranslation).subscribe({
        next: (response) => {
          console.log('Tłumaczenie zostało zaktualizowane:', response);
        },
        error: (err) => {
          console.error('Błąd podczas aktualizacji tłumaczenia:', err);
        },
      });
    }
  }
}
