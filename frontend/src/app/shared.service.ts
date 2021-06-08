import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {Tutorial} from tutorial.model;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://127.0.0.1:3000/jobs/";

  constructor(private http:HttpClient) { }

  getAllJobs():Observable<any[]>{
    console.log("hey from ss");
    return this.http.get<any[]>(this.APIUrl);
  }
}
