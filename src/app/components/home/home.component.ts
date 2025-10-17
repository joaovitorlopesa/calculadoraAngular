import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Lista de funcionalidades
  features = [
    { icone: 'fa-calculator', titulo: 'Calcular Médias', descricao: 'Insira 4 notas e calcule automaticamente' },
    { icone: 'fa-chart-line', titulo: 'Ver Resultado', descricao: 'Descubra se foi aprovado, em recuperação ou reprovado' },
    { icone: 'fa-history', titulo: 'Histórico', descricao: 'Acesse todas as médias já calculadas' }
  ];
  constructor() { }
}