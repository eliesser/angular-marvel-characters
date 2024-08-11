import { Component, inject } from '@angular/core';

import { CharacterService } from '../../services/character/character.service';
import { ICharacter, IResults } from '../../interfaces/character.interface';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent, NgFor],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  characters: ICharacter[] = [];
  private characterService = inject(CharacterService);

  ngOnInit() {
    this.characterService.getAll().subscribe((results: IResults) => {
      console.log(results);
      this.characters = results.results;
    });
  }
}
