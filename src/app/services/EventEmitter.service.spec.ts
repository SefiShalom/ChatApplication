/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventEmitter } from './EventEmitter';

describe('ChatserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventEmitter]
    });
  });

  it('should ...', inject([EventEmitter], (service: EventEmitter) => {
    expect(service).toBeTruthy();
  }));
});
