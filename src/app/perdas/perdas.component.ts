import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Perda, PerdaBack } from '../perda';

@Component({
  selector: 'app-perdas',
  templateUrl: './perdas.component.html',
  styleUrls: ['./perdas.component.css']
})
export class PerdasComponent implements OnInit {

  public cpf: FormControl = new FormControl('')

  public perdas: Perda[] = [];

  public perdas_filtradas: Perda[] = [];

  public colunas: string[] = ['nome', 'email', 'cpf', 'tipo_lavoura', 'evento_ocorrido', 'editar']

  constructor(private api: ApiService, private rota: Router) { }

  ngOnInit(): void {
    this.api.getPerdas().subscribe(
      (perda_back: PerdaBack) => {
        console.log(perda_back)
        this.perdas = perda_back.results
        this.perdas_filtradas = perda_back.results
      },
      (erro: any) => {
        console.log(erro)
      }
    );
    this.cpf.valueChanges.subscribe(cpf => {
      console.log('firstname value changed')
      console.log(cpf)
      this.filtraPerdas(cpf)
    })
  }

  public adicionarPerda(): void {
    this.rota.navigate(['perda', 0],)
  }

  public atualizarPerda(perda: any): void {
    console.log(perda)
    this.rota.navigate(['perda', perda.id],)
  }

  public filtraPerdas(cpf: string) {
    if (cpf != '') {
      this.perdas_filtradas = this.perdas.filter(perda => perda.cpf == cpf)
    } else {
      this.perdas_filtradas = this.perdas
    }

  }

}
