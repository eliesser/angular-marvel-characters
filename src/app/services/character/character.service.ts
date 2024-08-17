import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import 'dotenv/config';

import { environment } from '../../../environments/environment';
import {
  IResponseMarvelApi,
  IResults,
} from '../../interfaces/character.interface';
import {
  IComicsResults,
  IResponseCharacterComics,
} from '../../interfaces/character-comics.interface';

const apikey: string = process.env['PUBLIC_API_KEY_MARVEL'] as string;
const privateKey: string = process.env['PRIVATE_API_KEY_MARVEL'] as string;
const ts = new Date().getTime();
const hash = CryptoJS.MD5(`${ts}${privateKey}${apikey}`).toString();

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
        ts,
        hash,
        apikey,
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
    let params = new HttpParams({
      fromObject: {
        ts,
        hash,
        apikey,
      },
    });

    return this.http
      .get<IResponseMarvelApi>(
        `${environment.apiUrl}/characters/${characterId}`,
        { params }
      )
      .pipe(
        map((responseMarvelApi: IResponseMarvelApi) => {
          return responseMarvelApi.data;
        })
      );
  }

  getAllComicsByCharacterId(characterId: string): Observable<IComicsResults> {
    let params = new HttpParams({
      fromObject: {
        ts,
        hash,
        apikey,
      },
    });

    return this.http
      .get<IResponseCharacterComics>(
        `${environment.apiUrl}/characters/${characterId}/comics`,
        { params }
      )
      .pipe(
        map((responseMarvelApi: IResponseCharacterComics) => {
          return responseMarvelApi.data;
        })
      );
  }
}
