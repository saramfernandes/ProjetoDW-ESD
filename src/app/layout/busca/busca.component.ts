import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busca',
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  query: string = '';

  buscar() {
    // TODO: IMPLEMENTAR lógica de busca
    console.log('Buscando:', this.query);
  }

  limpar() {
    // TODO: IMPLEMENTAR lógica de limpeza
    this.query = '';
    console.log('Campo limpo');
  }
}
