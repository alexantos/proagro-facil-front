import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApiService } from '../api.service';

export interface Grafico{
  nome: string,
  quantidade: number
}

export interface Grafico {
  results: Grafico[];
}


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  graficos: Grafico[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = ['Example', 'Example', 'Example'];
  public pieChartDatasets = [{data: [ 300, 500, 100 ]}];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getGraficos().subscribe(
      (graficos: Grafico[])=>{
        console.log("Graficos", graficos)
        this.pieChartLabels = graficos.map(grafico => grafico.nome);
        console.log("Quantidade", graficos.map(grafico => grafico.quantidade) )
        this.pieChartDatasets = [{data: graficos.map(grafico => grafico.quantidade)}]
      },
      (erro)=>{
        console.log(erro)
      }
    )
  }

}
