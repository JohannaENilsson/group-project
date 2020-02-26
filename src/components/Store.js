import { BehaviorSubject } from 'rxjs';


export const token$ = new BehaviorSubject(localStorage.getItem('token')); 

export function updateToken(token) {
  console.log(token);
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
  token$.next(token);
}

export const account_id$ = new BehaviorSubject; 

export function updateAccountId(account_id) {
  console.log(account_id);
 
  account_id$.next(account_id);
}

export const uid$ = new BehaviorSubject; 

export function updateUid(uid) {
  console.log(uid);
 
  uid$.next(uid);
}
