import { Component, OnInit, HostListener } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MediaRecord } from '../../models/media.model';
@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  historico: MediaRecord[] = [];
  mostrarModal: boolean = false;
  scrolled: boolean = false;
  constructor(private mediaService: MediaService) { }
  ngOnInit(): void {
    this.historico = this.mediaService.obterHistorico();
  }
  // HostListener detecta scroll da página
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrolled = window.pageYOffset > 50;
  }
  abrirModal(): void {
    this.mostrarModal = true;
  }
  fecharModal(): void {
    this.mostrarModal = false;
  }
  confirmarLimpar(): void {
    this.mediaService.limparHistorico();
    this.historico = [];
    this.fecharModal();
  }
  // TrackBy para otimizar o *ngFor
  trackByRegistro(index: number, registro: MediaRecord): number {
    return registro.id;
  }
}