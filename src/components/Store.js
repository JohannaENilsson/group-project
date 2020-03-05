import { BehaviorSubject } from 'rxjs';

export const token$ = new BehaviorSubject(localStorage.getItem('token')); 

export function updateToken(token) {
  console.log("HEJ", token);
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}


export const star$ = new BehaviorSubject(localStorage.getItem('star')); 

export function updateStar(star) {
  console.log("Star-->", star);
  if (star) {
    localStorage.setItem('star', star);
  } else {
    localStorage.removeItem('star');
  }
}

// logout --> uppdatera star function till null!
