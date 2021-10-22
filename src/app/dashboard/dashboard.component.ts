import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { response } from "express/lib/express"
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    this.http.get('http://localhost:3000/api/place/city_prices?city=hyderabad')
      .subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
  }

}
