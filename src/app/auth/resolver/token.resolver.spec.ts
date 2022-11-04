import { TestBed } from '@angular/core/testing';

import { TokenResolver } from './token.resolver';

describe('TokenResolver', () => {
  let resolver: TokenResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TokenResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
