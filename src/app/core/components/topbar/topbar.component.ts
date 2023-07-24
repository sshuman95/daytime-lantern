import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class TopbarComponent implements OnInit {
  private readonly _menuService: MenuService = inject(MenuService);
  public viewModel$?: Observable<{ deviceSize?: number; isOpen?: boolean }>;
  public ngOnInit(): void {
    this.viewModel$ = this._menuService.viewModel$;
  }
  public toggleDrawer() {
    this._menuService.toggleDrawer();
  }
}
