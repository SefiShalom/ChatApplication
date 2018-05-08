/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatslistItemService } from './chatslist-item.service';

describe('ChatslistItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatslistItemService]
    });
  });

  it('should ...', inject([ChatslistItemService], (service: ChatslistItemService) => {
    expect(service).toBeTruthy();
  }));
});
