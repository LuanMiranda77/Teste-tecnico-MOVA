import { Bandeira } from './bandeira';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovaService {

  readonly apiURL: string;

  private band!: Bandeira;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://restcountries.eu/rest/v2';
  }

  setBandeira(band: Bandeira){
     this.band = band;
  }
  getBandeira(): Bandeira{
    return this.band;
 }


  listAll(): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/all`)
      .toPromise()
      .then(response => response);
  }

  pesquisPais(band: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/alpha/${band}`)
      .toPromise()
      .then(response => response);
  }
  pesquisaRegion(region: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/region/${region}`)
      .toPromise()
      .then(response => response);
  }

  pesquisaName(name: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/name/${name}`)
      .toPromise()
      .then(response => response);
  }

  pesquisaCapital(capital: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/capital/${capital}`)
      .toPromise()
      .then(response => response);
  }

  pesquisaLingua(ling: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/lang/${ling}`)
      .toPromise()
      .then(response => response);
  }

  pesquisaCodigo(codeChamda: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/callingcode/${codeChamda}`)
      .toPromise()
      .then(response => response);
  }

  pesquisaVizinhos(sigla: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/alpha?codes=${sigla}`)
      .toPromise()
      .then(response => response);
  }
  filter(sigla: string): Promise<any> {
    return this.http.get<any>(`${this.apiURL}/all?fields=${sigla}`)
      .toPromise()
      .then(response => response);
  }




}
