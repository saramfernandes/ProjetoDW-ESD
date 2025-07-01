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

  // Se inscreve no evento listaAlfabeticaChanged para reagir quando a lista for alterada
  // e renderiza a lista atualizada
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
// Começa pelo primeiro nó da lista
  let atual: NoLista<string> | null = this.listaAlfabetica.obterPrimeiro();
 // Vai percorrendo a lista e criando elementos <tr><td> com os valores
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