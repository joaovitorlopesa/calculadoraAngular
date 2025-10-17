import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../../services/media.service';
@Component({
    selector: 'app-calculadora',
    templateUrl: './calculadora.component.html',
    styleUrls: ['./calculadora.component.css'],
    standalone: false
})
export class CalculadoraComponent implements AfterViewInit {
  @Input() nota1: number | null = null;
  @Input() nota2: number | null = null;
  @Input() nota3: number | null = null;
  @Input() nota4: number | null = null;
  @ViewChild('mensagemErro') mensagemErro!: ElementRef;
  constructor(private mediaService: MediaService, private router: Router, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.esconderErro();
  }
  calcularMedia(): void {
    if (this.nota1 === null || this.nota2 === null || this.nota3 === null || this.nota4 === null) {
      this.exibirErro('Preencha todas as notas!');
      return;
    }
    if (this.nota1 < 0 || this.nota1 > 10 || this.nota2 < 0 || this.nota2 > 10 || this.nota3 < 0 || this.nota3 > 10 || this.nota4 < 0 || this.nota4 > 10) {
      this.exibirErro('As notas devem estar entre 0 e 10!');
      return;
    }
    this.esconderErro();
    const notas = [this.nota1, this.nota2, this.nota3, this.nota4];
    const registro = this.mediaService.adicionarRegistro(notas);
    this.router.navigate(['/resultado', registro.media]);
  }
  private exibirErro(mensagem: string): void {
    this.renderer.setProperty(this.mensagemErro.nativeElement, 'textContent', mensagem);
    this.renderer.setStyle(this.mensagemErro.nativeElement, 'display', 'block');
  }
  private esconderErro(): void {
    this.renderer.setStyle(this.mensagemErro.nativeElement, 'display', 'none');
  }
}