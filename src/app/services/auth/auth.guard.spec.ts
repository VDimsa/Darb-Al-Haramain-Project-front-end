import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerSpy }],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow the authenticated user to access route', () => {
    localStorage.setItem('token', 'dummy-token');

    const result = guard.canActivate(null as any, null as any);

    expect(result).toBeTrue();
  });

  it('should redirect unauthenticated user to login', () => {
    localStorage.removeItem('token');

    const result = guard.canActivate(null as any, null as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
