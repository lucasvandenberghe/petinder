import {Component, inject} from '@angular/core';
import {PetService} from '../service/pet.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {environment} from '../../environments/environment';

@Component({
  imports: [],
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
}
