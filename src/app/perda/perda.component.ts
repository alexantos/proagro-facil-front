import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perda',
  templateUrl: './perda.component.html',
  styleUrls: ['./perda.component.css']
})
export class PerdaComponent implements OnInit {

  perda_formulario: FormGroup = new FormGroup({
    data_cadastro: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    tipo_lavoura: new FormControl('', [Validators.required]),
    data_colheira: new FormControl('', [Validators.required]),
    evento_ocorrido: new FormControl('', [Validators.required]),
  })

  constructor() {}

  ngOnInit(): void {
  }

}
