import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Pilha } from '../../estruturas/Pilha';
import { Pessoa } from '../../estruturas/Lista';

@Component({
  selector: 'app-lista-chegada',
  templateUrl: './lista-chegada.component.html',
  styleUrl: './lista-chegada.component.scss'
})
export class ListaChegadaComponent {
  @ViewChild('ulRef', { static: true }) ulRef!: ElementRef<HTMLUListElement>;
  listaChegada: Pilha<Pessoa>;

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
    const pessoas = this.listaChegada.ver();
    pessoas.forEach((pessoa, idx) => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = (idx + 1).toString();
      const tdNome = document.createElement('td');
      tdNome.textContent = pessoa.nome;
      const tdHorario = document.createElement('td');
      tdHorario.textContent = new Date(pessoa.horario).toLocaleTimeString();
      tr.appendChild(th);
      tr.appendChild(tdNome);
      tr.appendChild(tdHorario);
      tbody.appendChild(tr);
    });
  }

  desfazerUltimaChegada(): void {
    this.eventoService.desfazerUltimaChegada();
  }
}
