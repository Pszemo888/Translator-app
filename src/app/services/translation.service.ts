import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TranslationRequest {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  _id: string;
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

  translateText(request: TranslationRequest, customHeaders: { [key: string]: string }): Observable<TranslationResponse> {
    const headers = new HttpHeaders(customHeaders);
  
    return this.http.post<TranslationResponse>(`${this.apiUrl}/translations/translate`, request, { headers });
  }

  getLanguages(): Observable<{ code: string; name: string; nativeName: string }[]> {
    return this.http.get<{ code: string; name: string; nativeName: string }[]>(`${this.apiUrl}/languages`);
  }
}
