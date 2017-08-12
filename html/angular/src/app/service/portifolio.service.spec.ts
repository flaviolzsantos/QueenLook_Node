import { TestBed, inject } from '@angular/core/testing';

import { PortifolioService } from './portifolio.service';

describe('PortifolioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortifolioService]
    });
  });

  it('should be created', inject([PortifolioService], (service: PortifolioService) => {
    expect(service).toBeTruthy();
  }));
});
