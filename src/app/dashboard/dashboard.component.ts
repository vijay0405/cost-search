import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { response } from "express/lib/express"
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  cityData = {}
  isLoading = false

  ngOnInit(): void {
  }


  getData(city) {
    this.isLoading = true
    this.http.get('http://localhost:3000/api/place/city_prices?city='+city)
      .subscribe(res => {
        this.isLoading = false
        console.log(res)
        this.cityData = res['data']
      }, err => {
        console.log(err)
      })
  }

  onSearch(form: NgForm) {
    if (form.invalid) return
    console.log(form.value)
    this.getData(form.value.searchInput)
  }

}
