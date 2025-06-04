import { EventEmitter, Injectable } from '@angular/core';
import { Lista } from '../estruturas/Lista';
import { Pilha } from '../estruturas/Pilha';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  listaAlfabetica: Lista<string> = new Lista<string>();
  listaChegada: Pilha = new Pilha();

  listaAlfabeticaChanged = new EventEmitter<Lista<string>>();
  listaChegadaChanged = new EventEmitter<Pilha>();

  constructor() { }

  adicionarParticipante(nome: string): void {
    this.listaAlfabetica.inserirOrdenado(nome);
    this.listaChegada.insere(nome);

    this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
    this.listaChegadaChanged.emit(this.listaChegada);
  }

  getListaAlfabetica(): Lista<string> {
    return this.listaAlfabetica;
  }

  getListaChegada(): Pilha {
    return this.listaChegada;
  }
}
