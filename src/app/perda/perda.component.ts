import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Perda } from '../perda';

@Component({
  selector: 'app-perda',
  templateUrl: './perda.component.html',
  styleUrls: ['./perda.component.css']
})
export class PerdaComponent implements OnInit {

  public atualizar: boolean = false;

  public perda_formulario: FormGroup = new FormGroup({
    data_cadastro: new FormControl(''),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    tipo_lavoura: new FormControl('', [Validators.required]),
    data_colheira: new FormControl('', [Validators.required]),
    evento_ocorrido: new FormControl('', [Validators.required]),
  })

  public lavouras: string[] = ['milho', 'soja', 'trigo', 'feijão']

  constructor(private api: ApiService, private rota: Router) {}

  ngOnInit(): void {
  }

  salvaPerda(){
    if(this.perda_formulario.valid){
      if(this.atualizar){
        this.atualizaPerda();
      }else{
        this.adicionaPerda();
      }
    }else{
      console.log(this.perda_formulario)
      console.log("Formulário inválido")
    }
  }

  adicionaPerda(){
    let perda: Perda = this.perda_formulario.value
    this.api.salvaPerda(perda).subscribe(
      (resultado)=>{
        console.log(resultado)
        this.rota.navigate(['perdas'])
      },
      (erro)=>{
        console.log(erro);
      }
    )
  }

  atualizaPerda(){
    let perda: Perda = this.perda_formulario.value
    this.api.atualizaPerda(perda).subscribe(
      (resultado)=>{
        console.log(resultado)
        this.rota.navigate(['perdas'])
      },
      (erro)=>{
        console.log(erro);
      }
    )
  }

  excluiPerda(){

  }

}
