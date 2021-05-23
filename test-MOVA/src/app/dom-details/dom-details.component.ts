import { Languages } from './../languages';
import { MovaService } from './../mova.service';
import { Bandeira } from './../bandeira';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dom-details',
  templateUrl: './dom-details.component.html',
  styleUrls: ['./dom-details.component.css']
})
export class DomDetailsComponent implements OnInit {

  band: Bandeira;
  bands: Bandeira[];
  vizinhos = [];
  vizinho = [];
  name = '';
  linguas = '';

  constructor(private movaService: MovaService, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.name = params['name']);
    this.pesquisaByName(this.name);



  }

  pesquisaByName(name: string): void {
    this.movaService.pesquisaName(name).then(data => {
      this.band = data[0];
      console.log(this.band.borders);
      this.setLinguas(this.band.languages);
      this.listarvizinhos(this.band.borders);
    });
  }

  listarvizinhos(lista: []): void {
    for (const sigla of lista) {
      this.movaService.pesquisaVizinhos(sigla).then(data => {
        this.vizinho = data;
        this.vizinhos.push(this.vizinho[0]);
      });

    }
console.log('Aqui');
    console.log(this.vizinhos);
  }
  setLinguas(languages: Languages[]): void {
    for (const linga of languages) {
      this.linguas += linga.nativeName + ',  ';
    }
  }


}
