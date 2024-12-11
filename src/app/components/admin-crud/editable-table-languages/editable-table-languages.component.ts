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
  sortKey: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc'; 

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      code: [''],
      name: [''],
      nativeName: [' '],
    });
  }

  ngOnInit(): void {
    this.loadLanguages();
    this.adminService.reloadLanguages$.subscribe(() => {
      this.loadLanguages(); 
    });
  }

  sortTable(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.languages.sort((a: Language, b: Language) => {
      const valueA = String(a[key as keyof Language] || '').toLowerCase(); 
      const valueB = String(b[key as keyof Language] || '').toLowerCase();

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
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
        this.loadLanguages(); 
      },
      error: (err) => {
        console.error('Błąd podczas usuwania języka:', err);
      },
    });
  }
}