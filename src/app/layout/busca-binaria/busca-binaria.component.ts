import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { BuscaBinaria } from '../../estruturas/busca-binaria';
import { Lista, Pessoa } from '../../estruturas/Lista';

@Component({
  selector: 'app-busca-binaria',
  imports: [CommonModule, FormsModule],
  templateUrl: './busca-binaria.component.html',
  styles: [`
    .fade-glow-anim {
      animation: glow-fade 0.7s cubic-bezier(.17,.67,.45,.98);
    }
    @keyframes glow-fade {
      0% {
        box-shadow: 0 0 6px 2px var(--glow-color, #ffe066);
      }
      60% {
        box-shadow: 0 0 12px 4px var(--glow-color, #ffe066);
      }
      80% {
        box-shadow: 0 0 4px 1px var(--glow-color, #ffe066);
      }
      100% {
        box-shadow: none;
      }
    }
  `]
})
export class BuscaBinariaComponent {
  nome: string = '';
  resultado: boolean | null = null;
  animando = false;

  constructor(private eventoService: EventoService) {}

  buscar() {
    const lista: Lista<Pessoa> = this.eventoService.getListaAlfabetica();
    this.resultado = BuscaBinaria.buscarPorNome(this.nome, lista);
    this.animando = false;
    setTimeout(() => this.animando = true, 10);
  }
}
