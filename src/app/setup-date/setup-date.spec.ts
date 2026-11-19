import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupDate } from './setup-date';

describe('SetupDate', () => {
  let component: SetupDate;
  let fixture: ComponentFixture<SetupDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupDate],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupDate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
