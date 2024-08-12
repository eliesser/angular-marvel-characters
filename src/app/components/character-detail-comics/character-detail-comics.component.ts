import { Component, inject, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { CharacterDetailComicsCardComponent } from '../character-detail-comics-card/character-detail-comics-card.component';
import {
  IComic,
  IComicsResults,
} from '../../interfaces/character-comics.interface';
import { CharacterService } from '../../services/character/character.service';

@Component({
  selector: 'app-character-detail-comics',
  standalone: true,
  imports: [CharacterDetailComicsCardComponent, NgFor],
  templateUrl: './character-detail-comics.component.html',
  styleUrl: './character-detail-comics.component.scss',
})
export class CharacterDetailComicsComponent {
  @Input() characterId!: string;

  comics: IComic[] = [];

  private characterService = inject(CharacterService);

  ngOnInit() {
    this.getAllComicsByCharacterId();
  }

  getAllComicsByCharacterId() {
    this.characterService
      .getAllComicsByCharacterId(this.characterId)
      .subscribe((results: IComicsResults) => {
        this.comics = results.results;
      });
  }
}
