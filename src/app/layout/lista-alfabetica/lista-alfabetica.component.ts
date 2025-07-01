import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Lista, NoLista, Pessoa } from '../../estruturas/Lista';
@Component({
  selector: 'app-lista-alfabetica',
  templateUrl: './lista-alfabetica.component.html',
  styleUrl: './lista-alfabetica.component.scss'
})
export class ListaAlfabeticaComponent implements OnInit{
  @ViewChild('ulRef', { static: true }) ulRef!: ElementRef<HTMLUListElement>;
  listaAlfabetica: Lista<Pessoa>;

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
  let atual: NoLista<Pessoa> | null = this.listaAlfabetica.obterPrimeiro();
 // Vai percorrendo a lista e criando elementos <tr><td> com os valores
  while (atual) {
    const linhaTabela = document.createElement('tr');
    const celulaNome = document.createElement('td');
    celulaNome.textContent = atual.valor.nome;
    const celulaHorario = document.createElement('td');
    celulaHorario.textContent = new Date(atual.valor.horario).toLocaleTimeString();
    linhaTabela.appendChild(celulaNome);
    linhaTabela.appendChild(celulaHorario);
    tbody.appendChild(linhaTabela);
    atual = atual.proximo;
  }
}
}
