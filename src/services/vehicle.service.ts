import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from 'models/vehicles.model';
import { environment } from '../environments/environment';
import { Observable } from "rxjs";
import { PaginationList } from 'models/pagination-list.model';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private api: string = environment.apiUrl;

  constructor(protected http: HttpClient) {
  }
  create(): Vehicle {
    return new Vehicle();
  }

  get(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.api + "/vehicle/" + id)
  }

  delete(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(this.api + "/vehicle/" + id)
  }

  list(): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(this.api + "/vehicle")
  }

  save(v: Vehicle): Observable<Array<Vehicle>> {
    console.log(v)
    return this.http.post<Array<Vehicle>>(this.api + "/vehicle", v)
  }

  update(v: Vehicle): Observable<Array<Vehicle>> {
    return this.http.put<Array<Vehicle>>(this.api + "/vehicle", v)
  }

  pagination(page: number): Observable<PaginationList> {
    return this.http.post<PaginationList>(this.api + "/vehicle/pagination", { page: page })
  }

}
