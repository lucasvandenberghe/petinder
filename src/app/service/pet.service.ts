import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, Observable} from 'rxjs';
import {Pet} from '../model/pet';

@Service()
export class PetService {
  private readonly http = inject(HttpClient);
  private readonly petsUrl = `${environment.backendUrl}/pets`;

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl)
      .pipe(map((pets) => [...pets].sort((a, b) => a.name.localeCompare(b.name))));
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.petsUrl, pet);
  }

  getPet(name: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.petsUrl}/${name}`);
  }
}
