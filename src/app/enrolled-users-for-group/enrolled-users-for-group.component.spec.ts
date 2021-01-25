import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledUsersForGroupComponent } from './enrolled-users-for-group.component';

describe('EnrolledUsersForGroupComponent', () => {
  let component: EnrolledUsersForGroupComponent;
  let fixture: ComponentFixture<EnrolledUsersForGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledUsersForGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledUsersForGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
