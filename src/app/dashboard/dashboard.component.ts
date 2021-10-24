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
  cityData2 = {}
  cityData3 = {}

  isLoading = false

  ngOnInit(): void {
  }


  getData(city) {
    this.isLoading = true
    this.http.get('http://localhost:3000/api/place/cityPrices?city='+city)
      .subscribe(res => {
        this.isLoading = false
        console.log(res)
        this.cityData = res['data']
      }, err => {
        console.log(err)
      })
  }

  getComparisionData(city1, city2) {
    this.isLoading = true
    this.http.get(`http://localhost:3000/api/place/compare/cityPrices?city1=${city1}&city2=${city2}`)
      .subscribe(res => {
        this.isLoading = false
        console.log(res)
        // this.cityData = res['data']
        this.cityData2 = res['city1']
        this.cityData3 = res['city2']
      }, err => {
        console.log(err)
      })
  }

  onSearch(form: NgForm) {
    this.cityData = {}
    if (form.invalid) return
    console.log(form.value)
    this.getData(form.value.searchInput)
  }

  onCompareSearch(form: NgForm) {
    this.cityData2 = {}
    this.cityData3 = {}
    if (form.invalid) return
    console.log(form.value)
    this.getComparisionData(form.value.searchInput2, form.value.searchInput3)
  }

}
