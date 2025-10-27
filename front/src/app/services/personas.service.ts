import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Persona } from '../models/persona.models';

interface PersonaResponse {
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private API_URL = 'https://randomuser.me/api/';

  private results = 10;
  private SEED = 'abc';
  private page = 1;
  constructor(private http: HttpClient) { }

  getPersonas(): Observable<Persona[]> {
    const params = new HttpParams()
      .set('page', this.page.toString())
      .set('results', this.results.toString())
      .set('seed', this.SEED);

    return this.http.get<PersonaResponse>(this.API_URL, { params })
      .pipe(
        map(response => this.transformarDatos(response.results))
      );
  }

  private transformarDatos(randomUsers: any[]): Persona[] {
    return randomUsers.map((user, index) => ({
      id: index + 1,
      nombre: `${user.name.first} ${user.name.last}`,
      genero: user.gender === 'male' ? 'Masculino' : 'Femenino',
      ubicacion: `${user.location.city} , ${user.location.country}`,
      correo_electronico: user.email,
      fecha_nacimiento: user.dob.date,
      foto: user.picture.large
    }));
  }


}
