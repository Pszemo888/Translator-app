// src/app/services/translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TranslationRequest {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Metoda do tłumaczenia tekstu
  translateText(request: TranslationRequest): Observable<TranslationResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TranslationResponse>(`${this.apiUrl}/translations/translate`, request, { headers });
  }

  // Metoda do pobierania listy języków
  getLanguages(): Observable<{ code: string; name: string; nativeName: string }[]> {
    return this.http.get<{ code: string; name: string; nativeName: string }[]>(`${this.apiUrl}/languages`);
  }
}
