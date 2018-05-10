/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerEventEmitter } from './ServerEventEmitter';

describe('ChatserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerEventEmitter]
    });
  });

  it('should ...', inject([ServerEventEmitter], (service: ServerEventEmitter) => {
    expect(service).toBeTruthy();
  }));
});
