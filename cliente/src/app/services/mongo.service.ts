import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';
const baseUrl = 'http://localhost:8080/api/tutorials';
@Injectable({
  providedIn: 'root'
})
export class MongoService {
    constructor(private http: HttpClient) { }
    getAll(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(baseUrl);
    }
    get(id: any): Observable<Paciente> {
      return this.http.get(`${baseUrl}/${id}`);
    }
    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data);
    }
    update(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }
    deleteAll(): Observable<any> {
      return this.http.delete(baseUrl);
    }
    findByTitle(title: any): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(`${baseUrl}?title=${title}`);
    }
  
}
