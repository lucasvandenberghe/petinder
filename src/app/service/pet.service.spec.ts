import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Pet } from '../model/pet';
import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PetService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should get the pets from the backend', async () => {
    // given
    const petsResult: Pet[] = [
      {
        id: 1,
        name: 'test 1',
        kind: 'cat',
        image: 'images/test_1.jpg',
        profileText: 'test',
        popularity: 1,
      },
      {
        id: 2,
        name: 'test 2',
        kind: 'dog',
        image: 'images/test_2.jpg',
        profileText: 'test',
        popularity: 2,
      },
    ];

    // when
    const pets = firstValueFrom(service.getPets());

    // then
    const request = httpTesting.expectOne('http://localhost:8080/pets');
    expect(request.request.method).toBe('GET');
    request.flush(petsResult);
    expect(await pets).toEqual(petsResult);
  });
});
