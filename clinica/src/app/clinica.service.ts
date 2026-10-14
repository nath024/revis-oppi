import { Injectable } from '@angular/core';
import { Consulta } from './consulta';

@Injectable({ providedIn: 'root' })
export class ClinicaService {
  private readonly chave = 'consultas';
  private consultas: Consulta[] = [];

  constructor() {
    this.consultas = this.carregar();
  }

  listar(): Consulta[] {
    return [...this.consultas];
  }

  adicionar(consulta: Consulta): void {
    this.consultas.push(consulta);
    this.salvar();
  }

  calcularTotal(): number {
    return this.consultas.reduce((total, c) => total + c.preco, 0);
  }

  limpar(): void {
    this.consultas = [];
    this.salvar();
  }

  carregarExemplos(): void {
    const exemplos = [
      new Consulta('Maria Silva', '2026-10-01', 250),
      new Consulta('João Pereira', '2026-10-03', 180.5),
      new Consulta('Ana Souza', '2026-10-07', 320),
      new Consulta('Carlos Lima', '2026-10-10', 150),
    ];
    exemplos.forEach((c) => this.consultas.push(c));
    this.salvar();
  }

  private salvar(): void {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.setItem(this.chave, JSON.stringify(this.consultas));
  }

  private carregar(): Consulta[] {
    if (typeof sessionStorage === 'undefined') return [];
    const dados = sessionStorage.getItem(this.chave);
    return dados ? (JSON.parse(dados) as Consulta[]) : [];
  }
}