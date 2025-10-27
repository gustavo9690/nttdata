import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonasService } from './services/personas.service';
import { Persona } from './models/persona.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lista de Personas';
  personas: Persona[] = [];
  loading = false;
  error: string | null = null;

  constructor(private personasService: PersonasService) {}

  ngOnInit() {
    this.ListarPersonas();
  }

  ListarPersonas() {
    this.loading = true;
    this.error = null;
    
    this.personasService.getPersonas().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.loading = false;
        console.log('Personas cargadas:', personas);
      },
      error: (error) => {
        this.error = 'Error al cargar las personas';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

}
