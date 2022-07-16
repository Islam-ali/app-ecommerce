import { TestBed } from '@angular/core/testing';

import { ProdutService } from './produt.service';

describe('ProdutService', () => {
  let service: ProdutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
