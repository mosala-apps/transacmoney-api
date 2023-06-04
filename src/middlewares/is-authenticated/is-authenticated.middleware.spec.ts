import { IsAuthenticatedMiddleware } from './is-authenticated.middleware';

describe('IsAuthenticatedMiddleware', () => {
  it('should be defined', () => {
    expect(new IsAuthenticatedMiddleware()).toBeDefined();
  });
});
