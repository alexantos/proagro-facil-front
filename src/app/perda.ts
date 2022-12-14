export interface Perda {
  id: number;
  data_cadastro: Date;
  nome: string;
  email: string;
  cpf: string;
  longitude: number;
  latitude: number;
  tipo_lavoura: string;
  data_colheira: Date;
  evento_ocorrido: string;
}

export interface PerdaBack {
  results: Perda[];
}
