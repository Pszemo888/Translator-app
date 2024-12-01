import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent], // Importuj tylko, jeśli używasz w szablonie
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Poprawiono literówkę (styleUrl -> styleUrls)
})
export class AppComponent {
  title = 'translator';
}