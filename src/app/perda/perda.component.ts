import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private api: ApiService, private rota: Router, private rotaAtiva: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let id = Number(this.rotaAtiva.snapshot.paramMap.get('id'));
    if (id == 0){
      this.criar = true;
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
    if(this.perda_formulario.valid && this.validaCpf(this.perda_formulario.controls.cpf.value)){
      if(this.criar){
        this.adicionaPerda();
      }else{
        this.atualizaPerda();
      }
    }else{
      if(!this.validaCpf(this.perda_formulario.controls.cpf.value)){
        console.log(this.perda_formulario)
        this.snackBar.open('Cpf Inválido', 'Entendi', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }else{
        console.log(this.perda_formulario)
        this.snackBar.open('Preencha o formulário corretamente', 'Entendi', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
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

  validaCpf(cpf: string) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

  excluiPerda(){
    if (!this.criar){
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

}
