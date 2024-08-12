import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { IComic } from '../../interfaces/character-comics.interface';

@Component({
  selector: 'app-character-detail-comics-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './character-detail-comics-card.component.html',
  styleUrl: './character-detail-comics-card.component.scss',
})
export class CharacterDetailComicsCardComponent {
  @Input() comic!: IComic;
}
