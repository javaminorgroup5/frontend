import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService testing', () => {

  let authService = AuthService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [HttpClient],
      imports: [HttpClientTestingModule],
      providers: [authService]
    });

    authService = TestBed.get(AuthService);
  });
});
