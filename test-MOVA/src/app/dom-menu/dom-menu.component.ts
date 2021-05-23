import { Bandeira } from './../bandeira';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { MovaService } from '../mova.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Languages } from '../languages';

@Component({
  selector: 'app-dom-menu',
  templateUrl: './dom-menu.component.html',
  styleUrls: ['./dom-menu.component.css']
})
export class DomMenuComponent implements OnInit {

  bands = [];

  band: Bandeira;

  lang: Languages;

  typeFilter = '';

  sortOptions: SelectItem[];

  filterSelect: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(
    private movaService: MovaService, private primengConfig: PrimeNGConfig, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listAll();

    this.sortOptions = [
      { label: 'Pais', value: 'alpha3Code' },
      { label: 'Região', value: 'region' },
      { label: 'Capital', value: 'capital' },
      { label: 'Lingua', value: 'nativeName' },
      { label: 'Codigo de Ligação', value: 'callingCodes' },
    ];
    // this.sortRegion = [
    //   { label: 'África', value: 'africa' },
    //   { label: 'Américas', value: 'americas' },
    //   { label: 'Ásia', value: 'asia' },
    //   { label: 'Europa', value: 'europe' },
    //   { label: 'Oceania', value: 'oceania' },
    // ];
    this.route.params.subscribe(params => this.typeFilter = params['id']);
    this.sortOptions[this.typeFilter];
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  listAll(): void {
    this.movaService.listAll().then(data => this.bands = data);
  }

  filterTypes(data: any): void {

    if (this.typeFilter === 'alpha3Code') {
      this.pesquisaPais(data[this.typeFilter]);

    } else if (this.typeFilter === 'capital') {
      this.pesquisaCapital(data[this.typeFilter]);

    } else if (this.typeFilter === 'region') {
      this.pesquisaRegion(data[this.typeFilter]);

    } else if (this.typeFilter === 'nativeName') {

      this.pesquisaLingua(data[this.typeFilter]);

    } else if (this.typeFilter === 'callingCodes') {
      this.pesquisaCodigo(data[this.typeFilter]);
    }

  }

  filterBay(typeFilter: string): void {
    this.movaService.filter(typeFilter).then(data => {
      this.filterSelect = data;

      this.typeFilter = typeFilter;

    });
  }
  pesquisaPais(pais: string) {
    this.movaService.pesquisaVizinhos(pais)
      .then(data => this.bands = data);
  }

  pesquisaCapital(capital: string) {
    this.movaService.pesquisaCapital(capital)
      .then(data => this.bands = data);
  }

  pesquisaCodigo(codigoDeChamada: string) {
    this.movaService.pesquisaCodigo(codigoDeChamada)
      .then(data => this.bands = data);
  }
  pesquisaLingua(lingua: string) {
    this.movaService.pesquisaLingua(lingua)
      .then(data => this.bands = data);
  }
  pesquisaRegion(region: string) {
    this.movaService.pesquisaRegion(region)
      .then(data => this.bands = data);
  }

  pesquisaByName(nome: string): void {
    this.movaService.pesquisaName(nome.toLowerCase())
      .then(data => this.bands = data);
  }
  option(band: Bandeira) {
    this.router.navigateByUrl('/details');
    this.movaService.setBandeira(band);
  }

}
