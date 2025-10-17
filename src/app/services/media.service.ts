import { Injectable } from '@angular/core';
import { MediaRecord, StatusAprovacao }
  from '../models/media.model';
@Injectable({ providedIn: 'root' })
export class MediaService {
  private historico: MediaRecord[] = [];
  private proximoId: number = 1;
  constructor() {
    this.carregarHistorico();
  }
  // Calcula a média aritmética
  calcularMedia(notas: number[]): number {
    if (notas.length === 0) return 0;
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return parseFloat((soma / notas.length).toFixed(2));
  }
  // Determina o status de aprovação
  determinarStatus(media: number): StatusAprovacao {
    if (media >= 7) return StatusAprovacao.APROVADO;
    else if (media >= 5) return StatusAprovacao.RECUPERACAO;
    else return StatusAprovacao.REPROVADO;
  }
  // Adiciona um novo registro ao histórico
  adicionarRegistro(notas: number[]): MediaRecord {
    const media = this.calcularMedia(notas);
    const status = this.determinarStatus(media);
    const registro: MediaRecord = {
      id: this.proximoId++,
      notas: [...notas],
      media: media,
      status: status,
      data: new Date()
    };
    this.historico.push(registro);
    this.salvarHistorico();
    return registro;
  }
  // Retorna todo o histórico
  obterHistorico(): MediaRecord[] {
    return this.historico;
  }
  // Limpa todo o histórico
  limparHistorico(): void {
    this.historico = [];
    this.proximoId = 1;
    this.salvarHistorico();
  }
  // Salva no LocalStorage
  private salvarHistorico(): void {
    try {
      localStorage.setItem('historico_medias',
        JSON.stringify(this.historico));
      localStorage.setItem('proximo_id',
        this.proximoId.toString());
    } catch (error) {
      console.error('Erro ao salvar histórico', error);
    }
  }
  // Carrega do LocalStorage
  private carregarHistorico(): void {
    try {
      const dados = localStorage.getItem('historico_medias');
      if (dados) {
        this.historico = JSON.parse(dados);
      }
      const id = localStorage.getItem('proximo_id');
      if (id) {
        this.proximoId = parseInt(id);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico', error);
    }
  }
}