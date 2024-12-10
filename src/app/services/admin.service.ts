import { Injectable } from '@angular/core';
import { Translation, Language } from '../models/data.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

type newTranslation = {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

type newLanguage = {
  code: string;
  name: string;
  nativeName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api';
  private reloadTranslationsSubject = new Subject<void>();
  reloadTranslations$ = this.reloadTranslationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
  }
  triggerReloadTranslations() {
    this.reloadTranslationsSubject.next();
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
    return this.http.put<Translation>(`${this.apiUrl}/translations/${id}`, translation, { headers });
  }
  
  deleteTranslation(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.delete<void>(`${this.apiUrl}/translations/${id}`, { headers });
  }

  getLanguages(): Observable<Language[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<Language[]>(`${this.apiUrl}/languages`, { headers });
  }
  addLanguage(language: newLanguage): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post<{ message: string }>(`${this.apiUrl}/languages`, language, { headers });
  }
  deleteLanguage(id: string): Observable<{ message: string }> {
      const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/languages/${id}`, { headers });
  }

  
}
