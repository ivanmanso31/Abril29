import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../-servicio/producto.service';
import { Producto } from '../../-modelo/producto';

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent implements OnInit {

  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
        private route:ActivatedRoute,
        private router: Router,
        private servicio: ProductoService
  ){this.form = new FormGroup({
    'idProducto': new FormControl(0),
    'nombreProducto': new FormControl(''),
    'precioUnitario': new FormControl(0),
    'discontinued':new FormControl(0)
  });}

  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.id = data['id'];
      this.edicion= data['id'] != null;
      this.formaFormulario();

  });
}
  formaFormulario() {
    if(this.edicion){
      this.servicio.mostrarPorId(this.id)
        .subscribe(data => {
          this.form = new FormGroup({
            'idProducto': new FormControl(data.idProducto),
            'nombreProducto': new FormControl(data.nombreProducto),
            'precioUnitario': new FormControl(data.precioUnitario),
            'discontinued':new FormControl(data.discontinued)
          });
        })
    }
  }
  
operar(){
  let p:Producto = {
    'idProducto': this.form.value['idProducto'],
    'nombreProducto' : this.form.value['nombreProducto'],
    'precioUnitario': this.form.value['precioUnitario'],
    'discontinued':this.form.value['discontinued']
  }
  if(this.edicion){
   
    this.servicio.modificar(p)
      .subscribe(()=>{
        this.servicio.mostrarTodos()
          .subscribe(data=>{
            this.servicio.productoCambio.next(data);
          });
      });
  }else{
    this.servicio.insertar(p)
      .subscribe(()=>{
        this.servicio.mostrarTodos()
          .subscribe(data => {
            this.servicio.productoCambio.next(data);
          });
      });
  }
  this.router.navigate([''])
}
}
