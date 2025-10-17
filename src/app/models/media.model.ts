export enum StatusAprovacao {
    APROVADO = 'Aprovado',
    RECUPERACAO = 'Recuperação',
    REPROVADO = 'Reprovado'
}
export interface MediaRecord {
    id: number; notas: number[];
    media: number; status: StatusAprovacao;
    data: Date;
}