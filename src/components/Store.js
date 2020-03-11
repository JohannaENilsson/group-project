import { BehaviorSubject } from "rxjs";

export const token$ = new BehaviorSubject(localStorage.getItem("token"));

export function updateToken(token) {
  if (token) {
    token$.next(token);
    localStorage.setItem("token", token);
  } else {
    token$.next(token);
    localStorage.removeItem("token");
  }
}

export const star$ = new BehaviorSubject(JSON.parse(localStorage.getItem("star") || "[]"));

export function updateStar(star) {
  if (star) {
    star$.next(star);
    localStorage.setItem("star", JSON.stringify(star));
  } else {
    star$.next(star);
    localStorage.removeItem("star");
  }
}
