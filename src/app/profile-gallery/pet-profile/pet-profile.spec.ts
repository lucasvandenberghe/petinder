import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetProfile } from './pet-profile';

describe('PetProfile', () => {
  let component: PetProfile;
  let fixture: ComponentFixture<PetProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(PetProfile);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pet', {
      id: 1,
      name: 'Princess',
      kind: 'chicken',
      image: 'images/chicken1.jpg',
      profileText: 'test',
      popularity: 0
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
