import { EventEmitter, Injectable } from '@angular/core';
import { Lista } from '../estruturas/Lista';
import { Pilha } from '../estruturas/Pilha';
import { BuscaLinear } from '../estruturas/busca-linear';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  listaAlfabetica: Lista<string> = new Lista<string>();
  listaAlfabeticaOriginal: Lista<string> = new Lista<string>();
  listaChegada: Pilha = new Pilha();

  listaAlfabeticaChanged = new EventEmitter<Lista<string>>();
  listaAlfabeticaOriginalChanged = new EventEmitter<Lista<string>>();
  listaChegadaChanged = new EventEmitter<Pilha>();

  constructor() { }

  adicionarParticipante(nome: string): void {
    this.listaAlfabeticaOriginal.inserirOrdenado(nome);
    this.listaChegada.insere(nome);

    this.listaAlfabeticaOriginalChanged.emit(this.listaAlfabeticaOriginal);
    this.listaChegadaChanged.emit(this.listaChegada);
  }

  getListaAlfabetica(): Lista<string> {
    return this.listaAlfabeticaOriginal;
  }

  getListaChegada(): Pilha {
    return this.listaChegada;
  }

  buscarPorQuery(query: string): void {
    this.listaAlfabetica = BuscaLinear.buscarPorNome(query, this.listaAlfabeticaOriginal);
    this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
  }

  limparBusca(): void {
    this.listaAlfabetica = this.listaAlfabeticaOriginal;
    this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
  }
}
