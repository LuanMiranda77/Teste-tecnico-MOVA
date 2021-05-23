import { Languages } from './languages';
import { Url } from "url";

export interface Bandeira {
  flag: Url;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: string;
  languages: Languages[];
  borders: [];
}
