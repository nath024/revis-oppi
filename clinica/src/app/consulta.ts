export class Consulta {
  constructor(
    public paciente: string,
    public data: string, // formato yyyy-MM-dd
    public preco: number = 0
  ) {}
}