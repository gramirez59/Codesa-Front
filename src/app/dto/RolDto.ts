export class RolDto implements IRolDto {
  id: number;
  nombre: string;

  constructor(data?: IRolDto) {
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
      }
  }

  static fromJS(data: any): RolDto {
      data = typeof data === 'object' ? data : {};
      let result = new RolDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["nombre"] = this.nombre;
      return data;
  }

  clone(): RolDto {
      const json = this.toJSON();
      let result = new RolDto();
      result.init(json);
      return result;
  }
}

export interface IRolDto {
  id: number;
  nombre: string;
}
