import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Pet} from '../model/pet';

@Service()
export class PetService {
  private readonly http = inject(HttpClient);
  private readonly petsUrl = `${environment.backendUrl}/pets`;

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl);
  }
}
