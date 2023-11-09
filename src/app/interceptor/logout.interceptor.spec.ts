import { TestBed } from '@angular/core/testing';

import { LogoutInterceptor } from './logout.interceptor';

describe('LogoutInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogoutInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogoutInterceptor = TestBed.inject(LogoutInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
