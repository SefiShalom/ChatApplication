/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginserviceService } from './loginservice.service';

describe('LoginserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginserviceService]
    });
  });

  it('should ...', inject([LoginserviceService], (service: LoginserviceService) => {
    expect(service).toBeTruthy();
  }));
});
