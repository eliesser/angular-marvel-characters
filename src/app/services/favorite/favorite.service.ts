import { Injectable } from '@angular/core';

import { ICharacter } from '../../interfaces/character.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites!: BehaviorSubject<ICharacter[]>;

  constructor() {
    this.favorites = new BehaviorSubject<ICharacter[]>([]);
  }

  favoritesWatch(): Observable<ICharacter[]> {
    return this.favorites.asObservable();
  }

  favoritesSet(favorites: ICharacter[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));

    this.favorites.next(favorites);
  }
}
