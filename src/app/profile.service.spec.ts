import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';

describe('ProfileService testing', () => {
  let profileService: ProfileService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [profileService],
    });

    profileService = TestBed.inject(ProfileService);
  });
});
