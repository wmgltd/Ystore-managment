import { TestBed } from '@angular/core/testing';

import { InitStoreService } from './init-store.service';

describe('InitStoreService', () => {
  let service: InitStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
