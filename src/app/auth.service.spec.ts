import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService testing', () => {

  let authService = AuthService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [authService]
    });

    authService = TestBed.get(AuthService);
  });

});
