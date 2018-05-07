/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatlistItemService } from './chatlist-item.service';

describe('ChatlistItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatlistItemService]
    });
  });

  it('should ...', inject([ChatlistItemService], (service: ChatlistItemService) => {
    expect(service).toBeTruthy();
  }));
});
