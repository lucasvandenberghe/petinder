import {Component, inject, input} from '@angular/core';
import {PetService} from '../service/pet.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {environment} from '../../environments/environment';
import {RouterLink} from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-setup-date',
  styleUrl: './setup-date.css',
  templateUrl: './setup-date.html',
})
export class SetupDate {
  readonly name = input.required<string>();
  private readonly service = inject(PetService);
  protected readonly pet = rxResource({
    params: () => (this.name()),
    stream: ({params}) => this.service.getPet(params)
  });
  protected readonly baseApiUrl = environment.backendUrl;
}
