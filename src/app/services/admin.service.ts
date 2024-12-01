import { Injectable } from '@angular/core';
import { Translation } from '../models/data.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getTranslations(sourceLanguage?: string, targetLanguage?: string):  Observable<Translation[]> {
    let params = new HttpParams();
    if (sourceLanguage) {
      params = params.set('sourceLanguage', sourceLanguage);
    }
    if (targetLanguage) {
      params = params.set('targetLanguage', targetLanguage);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.http.get<Translation[]>(`${this.apiUrl}/translations`, { headers, params });
  }
}
