import { BehaviorSubject } from 'rxjs';

export const token$ = new BehaviorSubject(localStorage.getItem('token'));

export function updateToken(token) {
  if (token) {
    token$.next(token);
    localStorage.setItem('token', token);
  } else {
    token$.next(token);
    localStorage.removeItem('token');
  }
}
