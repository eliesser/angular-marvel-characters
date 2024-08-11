export interface IResponseMarvelApi {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IResults;
}

export interface IResults {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ICharacter[];
}

export interface ICharacter {
  id?: number;
  name?: string;
  description?: string;
  modified?: string;
  thumbnail?: Thumbnail;
  resourceURI?: string;
  comics?: Comics;
  series?: Comics;
  stories?: Stories;
  events?: Comics;
  urls?: Url[];
}

interface Url {
  type: string;
  url: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

interface Item2 {
  resourceURI: string;
  name: string;
  type: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

interface Item {
  resourceURI: string;
  name: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

export interface IApyKeyParams {
  ts: number;
  hash: string;
  apikey: string;
}

export interface IGetAllParams extends IApyKeyParams {
  limit: number;
  offset: number;
  nameStartsWith?: string;
}
