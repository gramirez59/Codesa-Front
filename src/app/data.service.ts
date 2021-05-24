import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from './dto/UserDto';
import { RolDto } from './dto/RolDto';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    console.log('service is working!');
  }

  GetUsers(nombre: string): Observable<UserDto[]> {
    let url = 'http://localhost:8000/GetUsers';
    if(nombre !== null && nombre !== ''){
      url = url + `/${nombre}`;
    }
    return this.http.get<UserDto[]>(url)
    .pipe(tap(datos => console.log(datos)),
    map(datos => datos),
    catchError(this.handleError));
  }

  GetRols(): Observable<RolDto[]> {
    let url = 'http://localhost:8000/GetRols';
    return this.http.get<RolDto[]>(url)
    .pipe(tap(datos => console.log(datos)),
    map(datos => datos),
    catchError(this.handleError));
  }

  CreateUser(user: UserDto): Observable<number> {
    return this.http.post<number>('http://localhost:8000/CreateUser', user)
    .pipe(tap(response => console.log(response)),
    map(response => response),
    catchError(this.handleError));
  }

  UpdateUser(user: UserDto){
    return this.http.put<number>('http://localhost:8000/UpdateUser', user)
    .pipe(tap(response => console.log(response)),
    map(response => response),
    catchError(this.handleError));
  }

  DeleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`http://localhost:8000/DeleteUser/${id}`)
    .pipe(tap(response => console.log(response)),
    map(response => response),
    catchError(this.handleError));
  }

  private handleError(error: any){
    console.log(error);
    return throwError(error);
  }
}
