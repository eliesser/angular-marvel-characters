import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { CharacterService } from '../../services/character/character.service';
import { ICharacter, IResults } from '../../interfaces/character.interface';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent, NgFor],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  characters: ICharacter[] = [];
  favorites: ICharacter[] = [];

  private characterService = inject(CharacterService);

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.characterService.getAll().subscribe((results: IResults) => {
      this.characters = results.results;
    });
  }
}
