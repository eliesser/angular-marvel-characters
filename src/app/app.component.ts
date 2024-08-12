import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FavoriteService } from './services/favorite/favorite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private favoriteService = inject(FavoriteService);

  ngOnInit() {
    this.getFavoritesFromLocalStorage();
  }

  getFavoritesFromLocalStorage() {
    const storedFavoritesString = localStorage.getItem('favorites');

    const favorites = storedFavoritesString
      ? JSON.parse(storedFavoritesString)
      : [];

    this.favoriteService.favoritesSet(favorites);
  }
}
