import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  IResponseMarvelApi,
  IResults,
} from '../../interfaces/character.interface';
import {
  IComicsResults,
  IResponseCharacterComics,
} from '../../interfaces/character-comics.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);

  getAll(
    nameStartsWith: string = '',
    limit: number = 50,
    offset: number = 0
  ): Observable<IResults> {
    let params = new HttpParams({
      fromObject: {
        limit,
        offset,
      },
    });

    if (nameStartsWith.length)
      params = params.set('nameStartsWith', nameStartsWith);

    return this.http
      .get<IResponseMarvelApi>(`${environment.apiUrl}/characters`, { params })
      .pipe(
        map((responseMarvelApi: IResponseMarvelApi) => {
          return responseMarvelApi.data;
        })
      );
  }

  getOne(characterId: string): Observable<IResults> {
    return this.http
      .get<IResponseMarvelApi>(
        `${environment.apiUrl}/characters/${characterId}`,
        {}
      )
      .pipe(
        map((responseMarvelApi: IResponseMarvelApi) => {
          return responseMarvelApi.data;
        })
      );
  }

  getAllComicsByCharacterId(characterId: string): Observable<IComicsResults> {
    return this.http
      .get<IResponseCharacterComics>(
        `${environment.apiUrl}/characters/${characterId}/comics`,
        {}
      )
      .pipe(
        map((responseMarvelApi: IResponseCharacterComics) => {
          return responseMarvelApi.data;
        })
      );
  }
}
