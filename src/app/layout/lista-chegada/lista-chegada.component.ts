import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { No, Pilha } from '../../estruturas/Pilha';

@Component({
  selector: 'app-lista-chegada',
  templateUrl: './lista-chegada.component.html',
  styleUrl: './lista-chegada.component.scss'
})
export class ListaChegadaComponent {
  @ViewChild('ulRef', { static: true }) ulRef!: ElementRef<HTMLUListElement>;
  listaChegada: Pilha;

  constructor(private eventoService: EventoService) {
    this.listaChegada = this.eventoService.getListaChegada();
  }

 ngOnInit(): void {
  this.eventoService.listaChegadaChanged.subscribe((pilha) => {
    this.listaChegada = pilha;
    this.renderizarLista();
  });

    this.renderizarLista();
  }

 renderizarLista(): void {
  const tbody = this.ulRef.nativeElement;
  tbody.innerHTML = '';

  let pilhaAuxTopo: any = null;
  let atual = (this.listaChegada as any)['topo'];

  while (atual) {
    const novoNo = {
      nome: atual.nome,
      anterior: pilhaAuxTopo
    };
    pilhaAuxTopo = novoNo;
    atual = atual.anterior;
  }

  let ordem = 1;
  atual = pilhaAuxTopo;
  while (atual) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = ordem.toString();
    const td = document.createElement('td');
    td.textContent = atual.nome;
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
    atual = atual.anterior;
    ordem++;
  }
}
}
