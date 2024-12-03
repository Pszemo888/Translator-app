//import { Component } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService} from '../../services/admin.service';
import { Translation } from '../../models/data.model'; 
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReadTranstationsComponent } from '../adminCRUD/read-transtations/read-transtations.component';
import { AddTranslationComponent } from '../adminCRUD/add-translation/add-translation.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  getAdminReadTranslations() {
    return ReadTranstationsComponent;
  }

  getAdminAddTranslations() {
    return AddTranslationComponent;
  }

}
