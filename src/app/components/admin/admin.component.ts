//import { Component } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditableTableTranslationComponent } from '../admin-crud/editable-table-translations/editable-table-translations.component';
import { AddTranslationComponent } from '../admin-crud/add-translation/add-translation.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  getAdminReadTranslations() {
    return EditableTableTranslationComponent;
  }

  getAdminAddTranslations() {
    return AddTranslationComponent;
  }

}
