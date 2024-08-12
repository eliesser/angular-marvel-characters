import { Component, inject, Input } from '@angular/core';
import { ICharacter } from '../../interfaces/character.interface';
import { NgIf } from '@angular/common';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-character-detail-header',
  standalone: true,
  imports: [NgIf, FavoriteButtonComponent],
  templateUrl: './character-detail-header.component.html',
  styleUrl: './character-detail-header.component.scss',
})
export class CharacterDetailHeaderComponent {
  @Input() character!: ICharacter;

  favorites: ICharacter[] = [];

  private favoriteService = inject(FavoriteService);
  private favoritesSubscription!: Subscription;

  ngOnInit() {
    this.favoritesSubscription = this.favoriteService
      .favoritesWatch()
      .subscribe((characters: ICharacter[]) => {
        this.favorites = characters;
      });
  }

  onToggleFavorite(event: Event) {
    event.stopPropagation();

    let updatedFavorites;

    if (this.isFavorite()) {
      updatedFavorites = this.favorites.filter(
        (fav) => fav.id !== this.character.id
      );
    } else {
      updatedFavorites = [...this.favorites, this.character];
    }

    this.favoriteService.favoritesSet(updatedFavorites);
  }

  isFavorite() {
    return this.favorites.some((fav) => fav?.id === this.character?.id);
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
}
