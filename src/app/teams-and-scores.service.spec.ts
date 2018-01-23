import { TestBed, inject } from '@angular/core/testing';

import { TeamsAndScoresService } from './teams-and-scores.service';

describe('TeamsAndScoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsAndScoresService]
    });
  });

  it('should be created', inject([TeamsAndScoresService], (service: TeamsAndScoresService) => {
    expect(service).toBeTruthy();
  }));
});
