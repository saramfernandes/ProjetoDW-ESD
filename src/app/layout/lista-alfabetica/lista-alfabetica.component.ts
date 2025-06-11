import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Lista, NoLista } from '../../estruturas/Lista';
@Component({
  selector: 'app-lista-alfabetica',
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
  const tbody = this.ulRef.nativeElement;
  tbody.innerHTML = '';

  let atual: NoLista<string> | null = this.listaAlfabetica.obterPrimeiro();

  while (atual) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = atual.valor;
    tr.appendChild(td);
    tbody.appendChild(tr);
    atual = atual.proximo;
  }
}
}
