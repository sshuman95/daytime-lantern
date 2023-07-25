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
  public something = 0;
  public deviceSize$: Observable<number> = fromEvent(window, 'resize').pipe(
    map((_) => {
      return window.innerWidth;
    }),
    debounceTime(200),
    startWith(window.innerWidth),
    distinctUntilChanged()
  );

  public viewModel$: Observable<{ deviceSize?: number; isOpen?: boolean }> =
    combineLatest([this.deviceSize$, this.isOpenSubject]).pipe(
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

  public toggleDrawer() {
    this.isOpenSubject.next(!this.isOpenSubject.getValue());
  }

  public closeDrawer() {
    this.isOpenSubject.next(false);
  }
}
