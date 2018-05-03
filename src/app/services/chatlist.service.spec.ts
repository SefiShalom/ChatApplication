/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatlistService } from './chatlistitem.service';

describe('ChatlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatlistService]
    });
  });

  it('should ...', inject([ChatlistService], (service: ChatlistService) => {
    expect(service).toBeTruthy();
  }));
});
