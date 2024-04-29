import { Component } from '@angular/core';
import { ProductoService } from '../-servicio/producto.service';
import { Producto } from '../-modelo/producto';
import { AltaComponent } from './alta/alta.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [AltaComponent,RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  constructor(private servicio:ProductoService){}
  productos:Producto[] = [];

  ngOnInit(): void {
    this.servicio.productoCambio
    .subscribe((data) => {this.productos = data}
    )
    
    this.servicio.mostrarTodos()
       .subscribe(datos => {
          this.productos = datos;
          console.log("entra");

       })

    

  }

  eliminar(id:number){
    this.servicio.eliminar(id)
      .subscribe(()=>
        {
          this.servicio.mostrarTodos()
            .subscribe(data=>this.servicio.productoCambio.next(data))
        })

  }

  recibirAviso(listaActualizada:Observable<Producto[]>){
      console.warn("regresa el padre ----")
      //listaActualizada.subscribe(data => this.empleados = data);
      this.servicio.mostrarTodos()
      .subscribe(datos => {
         this.productos = datos;
         console.log("entra");

      })
  }
}
