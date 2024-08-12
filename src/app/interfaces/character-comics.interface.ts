export interface IResponseCharacterComics {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IComicsResults;
}

export interface IComicsResults {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IComic[];
}

export interface IComic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string | null;
  modified?: string;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: number;
  textObjects?: TextObject[];
  resourceURI?: string;
  urls?: Url[];
  series?: Series;
  variants?: any[];
  collections?: any[];
  collectedIssues?: Series[];
  dates?: Date[];
  prices?: Price[];
  thumbnail?: Thumbnail;
  images?: Thumbnail[];
  creators?: Creators;
  characters?: Characters;
  stories?: Stories;
  events?: Events;
}

interface Events {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
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

interface Characters {
  available: number;
  collectionURI: string;
  items: Series[];
  returned: number;
}

interface Creators {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

interface Item {
  resourceURI: string;
  name: string;
  role: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface Price {
  type: string;
  price: number;
}

interface Date {
  type: string;
  date: string;
}

interface Series {
  resourceURI: string;
  name: string;
}

interface Url {
  type: string;
  url: string;
}

interface TextObject {
  type: string;
  language: string;
  text: string;
}
