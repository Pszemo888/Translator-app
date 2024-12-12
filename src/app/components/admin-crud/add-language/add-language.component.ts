import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-language',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css'],
})
export class AddLanguageComponent {
  @Output() languageAdded = new EventEmitter<void>(); 
  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      name: ['', Validators.required],
      nativeName: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const newLanguage = this.form.value;
  
      this.adminService.addLanguage(newLanguage).subscribe({
        next: (language) => {
          console.log(language); 
          this.form.reset();
          this.adminService.triggerReloadLanguages();
        },
        error: (err) => {
          console.error('Error adding language:', err);
        },
      });
    }
  }
}