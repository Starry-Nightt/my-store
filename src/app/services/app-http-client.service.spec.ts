/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppHttpClientService } from './app-http-client.service';

describe('Service: AppHttpClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppHttpClientService]
    });
  });

  it('should ...', inject([AppHttpClientService], (service: AppHttpClientService) => {
    expect(service).toBeTruthy();
  }));
});
