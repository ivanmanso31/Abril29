import { Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { AltaComponent } from './listar/alta/alta.component';

export const routes: Routes = [

    {path:'', component:ListarComponent, children:
    [{path:'alta', component:AltaComponent},
    {path:'edicion/:id', component:AltaComponent}
    ]
    }
];
