import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';
import { Perda } from '../perda';

@Component({
  selector: 'app-perda',
  templateUrl: './perda.component.html',
  styleUrls: ['./perda.component.css']
})
export class PerdaComponent implements OnInit {

  public criar: boolean = false;

  public perda_formulario: FormGroup = new FormGroup({
    id: new FormControl(''),
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

  constructor(private api: ApiService, private rota: Router, private rotaAtiva: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    let id = Number(this.rotaAtiva.snapshot.paramMap.get('id'));
    if (id == 0){
      this.criar = false;
    }else{
      this.api.getPerda(id).subscribe(
        (perda: Perda)=>{
          console.log(perda)
          this.perda_formulario.patchValue(perda)
        },
        (erro) => {
          console.log(erro);
        }
      );
    }
  }

  salvaPerda(){
    if(this.perda_formulario.valid){
      if(this.criar){
        this.adicionaPerda();
      }else{
        this.atualizaPerda();
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
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      data:{
        titulo: 'Excluir comunicação de perda',
        mensagem: 'Tem certeza que deseja excluir a comunicação de perda de nome ' + this.perda_formulario.controls.nome.value + ' ?',
        confirmar: 'Excluir',
        cancelar: 'Cancelar',
      },
      width: '30em'
    });

    dialogRef.afterClosed().subscribe(confirmacao => {
      if(confirmacao){
        this.api.excluirPerda(this.perda_formulario.controls.id.value).subscribe(
          (resultado)=>{
            console.log(resultado)
            this.rota.navigate(['perdas'])
          },
          (erro)=>{
            console.log(erro)
          }
        )
      }
    });
  }

}
