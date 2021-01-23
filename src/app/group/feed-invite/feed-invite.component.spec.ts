import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInviteComponent } from './feed-invite.component';

describe('FeedInviteComponent', () => {
  let component: FeedInviteComponent;
  let fixture: ComponentFixture<FeedInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedInviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
