import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ICharacter } from '../../interfaces/character.interface';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [NgIf, FavoriteButtonComponent],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character!: ICharacter;
}
