import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { Subscription } from 'rxjs';
import { ICharacter } from '../../interfaces/character.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FavoriteButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  favorites: ICharacter[] = [];

  private router = inject(Router);
  private favoriteService = inject(FavoriteService);
  private favoritesSubscription!: Subscription;

  ngOnInit(): void {
    this.favoritesSubscription = this.favoriteService
      .favoritesWatch()
      .subscribe((characters: ICharacter[]) => {
        this.favorites = characters;
      });
  }

  onGoToFavorites() {
    this.router.navigateByUrl('characters-list/favorites');
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
}
