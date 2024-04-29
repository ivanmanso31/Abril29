import { Injectable } from '@angular/core';
import { entorno } from '../-entorno/entorno';
import { Producto } from '../-modelo/producto';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url:string = `${entorno.HOST}/productos`;
  productoCambio = new Subject<Producto[]>();

  constructor(private http:HttpClient) { }

  mostrarTodos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url)
    .pipe(
    map(data => {return data.sort((a,b) => a.idProducto-b.idProducto)})
    )
  };

  mostrarPorId(id:number){
    return this.http.get<Producto>(`${this.url}/${id}`);
  };

  insertar(p:Producto){
    return this.http.post(this.url,p);
  };

  modificar(p:Producto){
    return this.http.put(this.url,p);
  };

  eliminar(id:number){
    return this.http.delete<number>(`${this.url}/${id}`);
  };
}
