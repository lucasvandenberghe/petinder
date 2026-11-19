import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddPet} from './add-pet';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('AddPet', () => {
  let component: AddPet;
  let fixture: ComponentFixture<AddPet>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPet],
      providers: [provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPet);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    TestBed.tick();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should not send a request to create a new pet', () => {
    let kindInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    let addPet: HTMLElement;
    let submitButton: HTMLButtonElement;

    beforeEach(async () => {
      addPet = fixture.nativeElement as HTMLElement;
      kindInput = addPet.querySelector('#kind') as HTMLInputElement;
      nameInput = addPet.querySelector('#name') as HTMLInputElement;
      submitButton = addPet.querySelector('button') as HTMLButtonElement;
    });

    afterEach(() => {
      httpTesting.verify();
    })

    it('when no name is provided and show an error message', async () => {
      kindInput.value = 'dog';
      kindInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      expect(addPet.textContent).not.toContain('A pet needs a name.');

      submitButton.click();

      await fixture.whenStable();

      httpTesting.expectNone({
          url: 'http://localhost:8080/pets',
          method: 'POST'
        }
      );
      expect(addPet.textContent).toContain('A pet needs a name.');

    });

    it('when an unknown kind is provided and show an error message', async () => {
      kindInput.value = 'test';
      kindInput.dispatchEvent(new Event('input'));

      nameInput.value = 'test';
      nameInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      submitButton.click();

      await fixture.whenStable();

      httpTesting.expectNone({
        url: 'http://localhost:8080/pets',
        method: 'POST'
      });
      expect(addPet.textContent).toContain('Kind should be either a dog, cat or chicken.');
    });
  });

});
