import {Component, inject, output, signal} from '@angular/core';
import {Pet} from '../../model/pet';
import {form, FormField, FormRoot, pattern, required} from '@angular/forms/signals';
import {ReactiveFormsModule} from '@angular/forms';
import {PetService} from '../../service/pet.service';
import {firstValueFrom} from 'rxjs';

@Component({
  imports: [
    FormRoot,
    FormField,
    ReactiveFormsModule
  ],
  selector: 'app-add-pet',
  styleUrl: './add-pet.css',
  templateUrl: './add-pet.html',
})
export class AddPet {
  petAdded = output<Pet>();
  private static readonly emptyPet: Pet = {
    id: 0,
    name: '',
    kind: '',
    image: '',
    profileText: '',
    popularity: 0
  };
  private readonly service = inject(PetService);
  private readonly newPet = signal<Pet>({
    ...AddPet.emptyPet
  });
  protected readonly petForm = form(this.newPet, (pet) => {
      required(pet.name, {message: 'A pet needs a name.'});
      required(pet.kind, {message: 'A pet needs a kind.'});
      pattern(pet.kind, /^(dog|cat|chicken)$/i, {
        message: 'Kind should be either a dog, cat or chicken.'
      });
    },
    {
      submission: {
        action: async () => {
          const createdPet = await firstValueFrom(this.service.addPet(this.newPet()));

          this.petForm().reset();
          this.newPet.set({...AddPet.emptyPet});
          this.petAdded.emit(createdPet);
        }
      }
    }
  );
}
