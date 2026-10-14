import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClinicaService } from './clinica.service';
import { Consulta } from './consulta';

@Component({
  selector: 'app-consultas',
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
})
export class ConsultasComponent {
  private fb = inject(FormBuilder);
  private service = inject(ClinicaService);

  consultas = signal<Consulta[]>(this.service.listar());
  total = signal<number>(this.service.calcularTotal());

  form = this.fb.nonNullable.group({
    paciente: ['', [Validators.required, Validators.minLength(3)]],
    data: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]],
  });

  cadastrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { paciente, data, preco } = this.form.getRawValue();
    this.service.adicionar(new Consulta(paciente, data, preco));
    this.atualizar();
    this.form.reset({ paciente: '', data: '', preco: 0 });
  }

  carregarExemplos(): void {
    this.service.carregarExemplos();
    this.atualizar();
  }

  limpar(): void {
    this.service.limpar();
    this.atualizar();
  }

  private atualizar(): void {
    this.consultas.set(this.service.listar());
    this.total.set(this.service.calcularTotal());
  }
}