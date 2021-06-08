import { Component, OnInit, Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-indeed',
  templateUrl: './indeed.component.html',
  styleUrls: ['./indeed.component.css']
})

@Injectable()

export class IndeedComponent implements OnInit {
  dataRecvd: any;

  constructor(private service: SharedService, private http:HttpClient) { }

  ngOnInit(): void {

  }

  
  public getIndeedApi(){
    const url = 'http://127.0.0.1:8000/indeed';
    //return JSON.stringify(this.http.get(url));
    return this.http.get(url);
  }

}
