import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Pet} from '../model/pet';
import {ProfileGallery} from './profile-gallery';
import {provideRouter} from '@angular/router';

describe('ProfileGallery', () => {
  let component: ProfileGallery;
  let fixture: ComponentFixture<ProfileGallery>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGallery],
      providers: [provideHttpClientTesting(),
      provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileGallery);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    TestBed.tick();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTesting.expectOne('http://localhost:8080/pets');
  });

  it('should show the pets', async () => {
    const pets: Pet[] = [
      {
        id: 1,
        name: 'Princess',
        kind: 'chicken',
        image: 'images/chicken1.jpg',
        profileText: 'test',
        popularity: 0,
      },
    ];
    const gallery = fixture.nativeElement as HTMLElement;
    expect(gallery.textContent).toContain('Loading pets');

    httpTesting.expectOne('http://localhost:8080/pets').flush(pets);
    await fixture.whenStable();

    expect(gallery.textContent).toContain('Princess');
    expect(gallery.querySelector('img')?.getAttribute('src')).toBe(
      'http://localhost:8080/images/chicken1.jpg',
    );
  });

  it('should show an error when the backend is down', async () => {
    const gallery = fixture.nativeElement as HTMLElement;

    httpTesting.expectOne('http://localhost:8080/pets').error(new ProgressEvent('error'));
    await fixture.whenStable();

    expect(gallery.textContent).toContain('could not load the pets');
  });

  describe('given multiple pets', () => {
    beforeEach(async () => {
      const pets: Pet[] = [
        {
          id: 1,
          name: 'Princess',
          kind: 'chicken',
          image: 'images/chicken1.jpg',
          profileText: 'test',
          popularity: 0,
        },
        {
          id: 2,
          name: "MrFuzz",
          kind: "cat",
          image: "images/cat1.jpg",
          profileText: "MrFuzz loves belly rubs, and likes playing with pieces of string",
          popularity: 0
        },
        {
          id: 3,
          name: "Burt",
          kind: "dog",
          image: "images/dog1.jpg",
          profileText: "Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI",
          popularity: 0
        }
      ];

      httpTesting.expectOne('http://localhost:8080/pets').flush(pets);
      await fixture.whenStable();
    });

    it('should ignore casing when filtering by name', async () => {
      const gallery = fixture.nativeElement as HTMLElement;

      const searchInput = gallery.querySelector('input#name') as HTMLInputElement;
      searchInput.value = 'RIN';
      searchInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      const displayedPets = gallery.querySelectorAll('.gallery-pet');
      expect(displayedPets.length).toBe(1);
      expect(displayedPets[0].textContent).toContain('Princess');
      expect(gallery.textContent).not.toContain('MrFuzz');
      expect(gallery.textContent).not.toContain('MrFuzz loves belly rubs, and likes playing with pieces of string');
      expect(gallery.textContent).not.toContain('Burt');
      expect(gallery.textContent).not.toContain('Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI');
    });

    it('should make an unselected pet have the active class and show the profile text when it is clicked and undo both of those when clicking the pet again', async () => {
      const gallery = fixture.nativeElement as HTMLElement;

      const spy = vi.spyOn(component, 'selectPet');

      const galleryPetDiv = gallery.querySelectorAll('.gallery-pet')[1] as HTMLElement;

      galleryPetDiv.click();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalledOnce();
      expect(galleryPetDiv.classList.contains('active')).toBe(true);
      expect(gallery.textContent).toContain('MrFuzz loves belly rubs, and likes playing with pieces of string');

      galleryPetDiv.click();
      await fixture.whenStable();

      expect(galleryPetDiv.classList.contains('active')).toBe(false);
      expect(gallery.textContent).not.toContain('MrFuzz loves belly rubs, and likes playing with pieces of string');
    });
  });


});
