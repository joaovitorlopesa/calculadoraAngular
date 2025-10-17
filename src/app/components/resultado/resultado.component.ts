import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service';
@Component({
    selector: 'app-resultado',
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.css'],
    standalone: false
})
export class ResultadoComponent implements OnInit {
  media: number = 0;
  status: string = '';
  mensagem: string = '';
  icone: string = '';
  // HostBinding aplica a classe CSS dinâmica ao elemento host do componente (<app-resultado>)
  @HostBinding('class') get hostClass() {
    return `resultado-${this.status.toLowerCase()}`;
  }
  constructor(private route: ActivatedRoute, private mediaService: MediaService) { }
  ngOnInit(): void {
    // Obtém o parâmetro 'media' da URL
    this.route.paramMap.subscribe(params => {
      const mediaParam = params.get('media');
      if (mediaParam) {
        this.media = parseFloat(mediaParam);
        this.determinarResultado();
      }
    });
  }
  determinarResultado(): void {
    this.status = this.mediaService.determinarStatus(this.media);
    switch (this.status) {
      case 'Aprovado':
        this.mensagem = 'Parabéns! Você foi aprovado!';
        this.icone = 'fa-check-circle';
        break;
      case 'Recuperacao':
        this.mensagem = 'Você está em recuperação.';
        this.icone = 'fa-exclamation-triangle';
        break;
      case 'Reprovado':
        this.mensagem = 'Você foi reprovado.';
        this.icone = 'fa-times-circle';
        break;
    }
  }
}