import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grafico } from './grafico/grafico.component';
import { Perda, PerdaBack } from './perda';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  public getPerdas(): Observable<PerdaBack> {
    return this.http.get<PerdaBack>(this.url + '/perdas/');
  }

  public getPerda(id: number): Observable<Perda> {
    return this.http.get<Perda>(this.url + '/perdas/' + String(id) + '/');
  }

  public salvaPerda(perda: Perda): Observable<Perda>{
    return this.http.post<Perda>(this.url + '/perdas/', perda);
  }

  public atualizaPerda(perda: Perda): Observable<Perda> {
    return this.http.patch<Perda>(this.url + '/perdas/' + String(perda.id)+ '/', perda);
  }

  public excluirPerda(id: number): Observable<Perda> {
    return this.http.delete<Perda>(this.url + '/perdas/' + String(id)+ '/');
  }

  public pegaPelaUrl(url: string): any{
    return this.http.get<any>(url);
  }

  public getGraficos(): Observable<Grafico[]>{
    return this.http.get<Grafico[]>(this.url + '/grafico/');
  }

}
