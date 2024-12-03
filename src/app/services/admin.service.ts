import { Injectable } from '@angular/core';
import { Translation } from '../models/data.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

type newTranslation = {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
  }

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
  
  addTranslation(translation: newTranslation): Observable<Translation> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<Translation>(`${this.apiUrl}/translations`, translation, { headers });
  }
  //partial przeslanie tylko czesci danych obiektu
  updateTranslation(id: string, translation: Partial<Translation>): Observable<Translation>{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<Translation>(`${this.apiUrl}/translations/:id`, translation, { headers });
  }

   
  
}
