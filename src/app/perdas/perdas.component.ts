import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Perda, PerdaBack } from '../perda';

@Component({
  selector: 'app-perdas',
  templateUrl: './perdas.component.html',
  styleUrls: ['./perdas.component.css']
})
export class PerdasComponent implements OnInit {

  public perdas: Perda[] = [];

  public colunas: string[] = ['nome', 'email', 'cpf', 'tipo_lavoura', 'evento_ocorrido', 'editar']

  constructor(private api: ApiService, private rota: Router) {}

  ngOnInit(): void {
    this.api.getPerdas().subscribe(
      (perda_back: PerdaBack)=>{
        console.log(perda_back)
        this.perdas = perda_back.results
      },
      (erro: any)=>{
        console.log(erro)
      }
    )
  }

  public adicionarPerda(): void{
    this.rota.navigate(['perda', 0],)
  }

  public atualizarPerda(perda: any): void{
    console.log(perda)
    this.rota.navigate(['perda', perda.id],)
  }

}
