import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './core/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _menuService: MenuService = inject(MenuService);
  public viewModel$?: Observable<{ deviceSize?: number; isOpen?: boolean }>;

  public ngOnInit(): void {
    this.viewModel$ = this._menuService.viewModel$;
  }

  public closeDrawer() {
    this._menuService.closeDrawer();
  }
}
