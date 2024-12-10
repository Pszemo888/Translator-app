import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Language} from '../../../models/data.model';

@Component({
  selector: 'app-table-languages',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editable-table-languages.component.html',
  styleUrl: './editable-table-languages.component.css'
})
export class TableLanguagesComponent implements OnInit {
  languages: Language[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      code: [''],
      name: [''],
      nativeName: [' '],
    });
  }

  ngOnInit(): void {
    this.loadLanguages();
    this.adminService.reloadTranslations$.subscribe(() => {
      this.loadLanguages(); 
    });
  }

  loadLanguages(): void {
    this.adminService.getLanguages().subscribe({
      next: (languages) => {
        this.languages = languages;
        console.log('Pobrane języki:', this.languages);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania języków:', err);
      },
    });
  }

  deleteLanguage(id: string): void {
    this.adminService.deleteLanguage(id).subscribe({
      next: () => {
        console.log(`Język o kodzie ${id} został usunięty.`);
        this.loadLanguages(); // Odśwież listę po usunięciu
      },
      error: (err) => {
        console.error('Błąd podczas usuwania języka:', err);
      },
    });
  }
}