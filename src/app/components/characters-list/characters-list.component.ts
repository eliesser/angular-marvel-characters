import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CharacterService } from '../../services/character/character.service';
import { ICharacter, IResults } from '../../interfaces/character.interface';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { CharacterSearchComponent } from '../character-search/character-search.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent, NgFor, CharacterSearchComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  characters: ICharacter[] = [];
  favorites: ICharacter[] = [];

  private favoritesSubscription!: Subscription;
  private characterService = inject(CharacterService);
  private favoriteService = inject(FavoriteService);
  private router = inject(Router);

  ngOnInit() {
    this.favoritesWatch();
  }

  favoritesWatch() {
    this.favoritesSubscription = this.favoriteService
      .favoritesWatch()
      .subscribe((favorites: ICharacter[]) => {
        const isFavoritesRoute = this.router.url.includes('favorites');
        if (isFavoritesRoute) {
          this.characters = favorites; // Si estamos en la ruta de favoritos, asigna `favorites` a `characters`
        } else {
          this.getAll();
        }
      });
  }

  getAll() {
    this.characterService.getAll().subscribe((results: IResults) => {
      this.characters = results.results;
    });
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
}
