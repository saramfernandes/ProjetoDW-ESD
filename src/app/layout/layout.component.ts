import { Component } from '@angular/core';
import { ListaAlfabeticaComponent } from "./lista-alfabetica/lista-alfabetica.component";
import { ListaChegadaComponent } from "./lista-chegada/lista-chegada.component";
import { RegistroComponent } from "./registro/registro.component";
import { BuscaComponent } from "./busca/busca.component";
import { BuscaBinariaComponent } from "./busca-binaria/busca-binaria.component";

@Component({
  selector: 'app-layout',
  imports: [ListaAlfabeticaComponent, ListaChegadaComponent, RegistroComponent, BuscaComponent, BuscaBinariaComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
