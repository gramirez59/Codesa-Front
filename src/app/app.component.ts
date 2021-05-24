import { Component} from '@angular/core';
import { UserDto } from './dto/UserDto';
import { RolDto } from './dto/RolDto';
import { DataService } from 'src/app/data.service';
import { EnumResponseCode } from './enums/EnumResponseCode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codesa-admin-usuarios';
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'rol'];
  nombre = '';
  users: UserDto[];
  rols: RolDto[];
  newUser: UserDto;
  activo: boolean;
  inactivo: boolean;
  btnGuardarDisabled: boolean;
  btnEditarDisabled: boolean;
  btnEliminarDisabled: boolean;
  newUserStade: boolean;
  selectedValue: string;

  constructor(private dataService: DataService){
    this.consultar();
    this.getRols();
    this.newUser = new UserDto;
    this.btnGuardarDisabled = false;
    this.btnEditarDisabled = true;
    this.btnEliminarDisabled = true;
  }

  consultar() {
    this.dataService.GetUsers(this.nombre).subscribe(
      data => {
        this.users = data;
      }
    )
    this.limpiar();
  }

  crear() {
    this.limpiar();
    this.btnEditarDisabled = true;
    this.btnEliminarDisabled = true;
  }

  getRols(){
    this.dataService.GetRols().subscribe(
      data => {
        this.rols = data;
      }
    )
  }

  limpiar(){
    this.newUser = new UserDto;
    this.nombre = '';
    this.activo = false;
    this.inactivo = false;
    this.btnGuardarDisabled = false;
    this.selectedValue = null;
  }

  guardar(){
    this.newUser.activo = this.newUserStade;
    this.dataService.CreateUser(this.newUser).subscribe(
      data => {
        if(data === EnumResponseCode.USUARIO_CREADO_EXITOSAMENTE){
          alert('Usuario creado exitosamente')
        }
        if(data === EnumResponseCode.ERROR_CREAR_USUARIO){
          alert('Error al crear el usuario consulte con el administrador');
        }
      }
    )
    setTimeout( () => { this.consultar() }, 400 );
    this.limpiar();
  }

  editar(){
    this.newUser.activo = this.newUserStade;
    this.dataService.UpdateUser(this.newUser).subscribe(
      data => {
        if(data === EnumResponseCode.USUARIO_ACTUALIZADO_EXITOSAMENTE){
          alert('Usuario actualizado exitosamente')
        }
        if(data === EnumResponseCode.ERROR_ACTUALIZAR_USUARIO){
          alert('Error al actualizar el usuario consulte con el administrador');
        }
      }
    )
    setTimeout( () => { this.consultar() }, 400 );
    this.limpiar();
  }

  eliminar(){
    this.dataService.DeleteUser(this.newUser.id).subscribe(
      data => {
        if(data === EnumResponseCode.USUARIO_ELIMINADO_EXITOSAMENTE){
          alert('Usuario eliminado exitosamente')
        }
        if(data === EnumResponseCode.ERROR_ELIMINAR_USUARIO){
          alert('Error al eliminar el usuario consulte con el administrador');
        }
      }
    )
    setTimeout( () => { this.consultar() }, 400 );
    this.limpiar();
  }

  getRecord(data: UserDto) {
    this.newUser = new UserDto;
    console.log(data);
    this.newUser.id = data.id;
    this.newUser.nombre = data.nombre;
    this.newUser.rol = data.rol;
    if(data.activo){
      this.activo = true;
      this.inactivo = false;
    }
    else{
      this.inactivo = true;
      this.activo = false;
    }
    this.btnGuardarDisabled = true;
    this.btnEditarDisabled = false;
    this.btnEliminarDisabled = false;
  }

  activoChanged(data){
    this.newUserStade = data.value;
  }

}
