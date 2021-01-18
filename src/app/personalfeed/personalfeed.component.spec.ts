import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalfeedComponent } from './personalfeed.component';

describe('PersonalfeedComponent', () => {
  let component: PersonalfeedComponent;
  let fixture: ComponentFixture<PersonalfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
