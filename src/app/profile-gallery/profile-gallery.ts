import {Component, computed, inject, signal} from '@angular/core';
import {PetService} from '../service/pet.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {environment} from '../../environments/environment';
import {Pet} from '../model/pet';
import {PetProfile} from './pet-profile/pet-profile';
import {FormsModule} from '@angular/forms';
import {AddPet} from './add-pet/add-pet';

@Component({
  imports: [
    PetProfile,
    FormsModule,
    AddPet
  ],
  selector: 'app-profile-gallery',
  styleUrl: './profile-gallery.css',
  templateUrl: './profile-gallery.html',
})
export class ProfileGallery {
  private readonly petService = inject(PetService);
  protected readonly pets = rxResource({
    stream: () => this.petService.getPets(),
    defaultValue: []
  });
  protected readonly baseApiUrl = environment.backendUrl;
  protected readonly selectedPet = signal<Pet | undefined>(undefined);
  protected searchText = signal('');

  protected selectPet(pet: Pet) {
    this.selectedPet.update(currentlySelectedPet => currentlySelectedPet === pet ? undefined : pet);
  }

  protected readonly filteredPets = computed(() => {
    if (this.searchText() === '') return this.pets.value();

    return [...this.pets.value()]
      .filter(pet => pet.name.toLowerCase().includes(this.searchText().toLowerCase()));
  });

  protected showNewPet(pet: Pet) {
    this.pets.reload();

    this.selectPet(pet);
  }
}
