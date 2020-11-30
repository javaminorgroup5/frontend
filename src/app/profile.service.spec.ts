import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProfileService } from './profile.service';

describe('ProfileService testing', () => {
  let profileService: ProfileService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [HttpClient],
      imports: [HttpClientTestingModule],
      providers: [profileService],
    });

    profileService = TestBed.inject(ProfileService);
  });
});
