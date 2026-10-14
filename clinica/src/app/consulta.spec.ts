import { Consulta } from './consulta';

describe('Consulta', () => {
  it('should create an instance', () => {
    expect(new Consulta('Maria Silva', '2026-10-01')).toBeTruthy();
  });

  it('should initialize price with 0', () => {
    const consulta = new Consulta('Maria Silva', '2026-10-01');
    expect(consulta.preco).toBe(0);
  });
});