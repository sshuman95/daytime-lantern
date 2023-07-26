import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private isOpenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public isOpen$ = this.isOpenSubject.asObservable();

  public deviceSize$: Observable<number> = fromEvent(window, 'resize').pipe(
    map(() => {
      return window ? window.innerWidth : 0;
    }),
    debounceTime(200),
    startWith(window ? window.innerWidth : 0),
    distinctUntilChanged()
  );

  public viewModel$: Observable<{ deviceSize?: number; isOpen?: boolean }> =
    combineLatest([this.deviceSize$, this.isOpen$]).pipe(
      map(([deviceSize, isOpen]) => {
        if (deviceSize < 700) {
          return {
            deviceSize,
            isOpen,
          };
        }
        return {
          deviceSize,
          isOpen: true,
        };
      })
    );

  public toggleDrawer(): void {
    this.isOpenSubject.next(!this.isOpenSubject.getValue());
  }

  public closeDrawer(): void {
    this.isOpenSubject.next(false);
  }
}
