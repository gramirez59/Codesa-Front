export class UserDto implements IUserDto {
  id: number;
  nombre: string;
  activo: boolean;
  rol: number;

  constructor(data?: IUserDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.id = data["id"];
          this.nombre = data["nombre"];
          this.activo = data["activo"];
          this.rol = data["rol"];
      }
  }

  static fromJS(data: any): UserDto {
      data = typeof data === 'object' ? data : {};
      let result = new UserDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["nombre"] = this.nombre;
      data["activo"] = this.activo;
      data["rol"] = this.rol;
      return data;
  }

  clone(): UserDto {
      const json = this.toJSON();
      let result = new UserDto();
      result.init(json);
      return result;
  }
}

export interface IUserDto {
  id: number;
  nombre: string;
  activo: boolean;
  rol: number;
}
