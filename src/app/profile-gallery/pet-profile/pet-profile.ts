import {Component, input} from '@angular/core';
import {Pet} from '../../model/pet';
import {RouterLink} from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-pet-profile',
  styleUrl: './pet-profile.css',
  templateUrl: './pet-profile.html',
})
export class PetProfile {
  readonly pet = input.required<Pet>();
}
