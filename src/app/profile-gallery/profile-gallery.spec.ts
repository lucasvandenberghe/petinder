import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pet } from '../model/pet';
import { ProfileGallery } from './profile-gallery';

describe('ProfileGallery', () => {
  let component: ProfileGallery;
  let fixture: ComponentFixture<ProfileGallery>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGallery],
      providers: [provideHttpClientTesting()],
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
});
