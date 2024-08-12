import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { ICharacter } from '../../interfaces/character.interface';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [NgIf, FavoriteButtonComponent],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
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
    return this.favorites.some((fav) => fav.id === this.character.id);
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
}
