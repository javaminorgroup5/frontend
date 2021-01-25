import { TestBed } from '@angular/core/testing';
import { LikeService } from './like.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LikeService', () => {
  let service: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(LikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
