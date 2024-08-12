import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharacterDetailComicsComponent } from '../character-detail-comics/character-detail-comics.component';
import { CharacterDetailHeaderComponent } from '../character-detail-header/character-detail-header.component';
import { CharacterService } from '../../services/character/character.service';
import { ICharacter, IResults } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CharacterDetailHeaderComponent, CharacterDetailComicsComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  character!: ICharacter;
  characterId!: string;

  private characterService = inject(CharacterService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.characterId = params.get('id') || '';

      this.getOne(this.characterId);
    });
  }

  getOne(id: string) {
    this.characterService.getOne(id).subscribe((results: IResults) => {
      this.character = results.results[0];
    });
  }
}
