import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FavoriteButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
