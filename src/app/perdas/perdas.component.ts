import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Perda, PerdaBack } from '../perda';

@Component({
  selector: 'app-perdas',
  templateUrl: './perdas.component.html',
  styleUrls: ['./perdas.component.css']
})
export class PerdasComponent implements OnInit {

  public perdas: Perda[] = [];

  public colunas: string[] = ['nome', 'email', 'cpf', 'tipo_lavoura', 'evento_ocorrido']

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // this.perdas.push(
    //   {data_cadastro: new Date(), nome: "Thulengo", email: "tchulengo@gmail.com", cpf: "12345678900", longitude: 123, latitude: 123, tipo_lavoura: "milho", data_colheira: new Date(), evento_ocorrido: "GEADA"}
    // )
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

}
