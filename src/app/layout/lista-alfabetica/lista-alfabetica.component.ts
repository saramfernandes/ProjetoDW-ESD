import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Lista, NoLista } from '../../estruturas/Lista';
@Component({
  selector: 'app-lista-alfabetica',
  imports: [],
  templateUrl: './lista-alfabetica.component.html',
  styleUrl: './lista-alfabetica.component.scss'
})
export class ListaAlfabeticaComponent implements OnInit{
  @ViewChild('ulRef', { static: true }) ulRef!: ElementRef<HTMLUListElement>;
  listaAlfabetica: Lista<string>;

  constructor(private eventoService: EventoService) {
    this.listaAlfabetica = this.eventoService.getListaAlfabetica();
  }

  ngOnInit(): void {
    this.eventoService.listaAlfabeticaChanged.subscribe((lista) => {
      this.listaAlfabetica = lista;
      this.renderizarLista();
    });

    this.renderizarLista();
  }

  renderizarLista(): void {
    const ul = this.ulRef.nativeElement;
    ul.innerHTML = '';

    let atual: NoLista<string> | null = this.eventoService.getListaAlfabetica().obterPrimeiro();

    while (atual) {
      const li = document.createElement('li');
      li.textContent = atual.valor;
      ul.appendChild(li);
      atual = atual.proximo;
    }
  }
}
