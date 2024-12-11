//import { Component } from '@angular/core';
import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditableTableTranslationComponent } from '../admin-crud/editable-table-translations/editable-table-translations.component';
import { AddTranslationComponent } from '../admin-crud/add-translation/add-translation.component';
import { AddLanguageComponent } from '../admin-crud/add-language/add-language.component';
import { TableLanguagesComponent } from '../admin-crud/editable-table-languages/editable-table-languages.component';
import { Language } from '../../models/data.model'; 
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TableLanguagesComponent, EditableTableTranslationComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  languages: Language[] = []; 
  getAdminReadTranslations() {
    return EditableTableTranslationComponent;
  }

  getAdminAddTranslations() {
    return AddTranslationComponent;
  }

  getAdminAddLanguages() {
    return AddLanguageComponent;
  }

  getAdminReadLanguages(){
    return TableLanguagesComponent;
  }
  onLanguagesLoaded(languages: Language[]): void {
    this.languages = languages;
  }
}
