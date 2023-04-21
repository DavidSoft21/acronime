import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from './services/api-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'search acronime';

  dtOptions: DataTables.Settings = {};
  posts: any;

  constructor(private http: HttpClient, private _apiService: ApiServiceService) {

  }
  columnas: string[] = [
    'acronime_id',
    'date',
    'parent_acronime',
    'parent_representation',
    'representation_acronime',
    'representation_frequency',
    'representation_id',
    'representation_since',
    'var_frequency',
    'var_representation_acronime',
    'var_representation_id',
    'var_since'
  ];

  dataSource: any;
  dataTable: Result[] = [];

  ngOnInit() {
    this.dataTable.length = 0;
    this._apiService.getFilter().subscribe((respuesta: any) => {
      for (let index = 0; index < respuesta.length; index++) {
        this.dataTable.push(
          new Result(
            respuesta[index].acronime_id,
            respuesta[index].date,
            respuesta[index].parent_acronime,
            respuesta[index].parent_representation,
            respuesta[index].representation_acronime,
            respuesta[index].representation_frequency,
            respuesta[index].representation_id,
            respuesta[index].representation_since,
            respuesta[index].var_frequency,
            respuesta[index].var_representation_acronime,
            respuesta[index].var_representation_id,
            respuesta[index].var_since
          )
        );
      }
      this.dataSource = new MatTableDataSource(this.dataTable);
    })
  }

  onClick(argumento: string | '') {
    this.dataTable = [];
    this._apiService.getData(argumento).subscribe((res) => {
      for (let index = 0; index < res.length; index++) {
        this.dataTable.push(
          new Result(
            res[index].acronime_id,
            res[index].date,
            res[index].parent_acronime,
            res[index].parent_representation,
            res[index].representation_acronime,
            res[index].representation_frequency,
            res[index].representation_id,
            res[index].representation_since,
            res[index].var_frequency,
            res[index].var_representation_acronime,
            res[index].var_representation_id,
            res[index].var_since
          )
        );
      }

      this._apiService.getFilter().subscribe((respuesta: any) => {
        for (let index = 0; index < respuesta.length; index++) {
          this.dataTable.push(
            new Result(
              respuesta[index].acronime_id,
              respuesta[index].date,
              respuesta[index].parent_acronime,
              respuesta[index].parent_representation,
              respuesta[index].representation_acronime,
              respuesta[index].representation_frequency,
              respuesta[index].representation_id,
              respuesta[index].representation_since,
              respuesta[index].var_frequency,
              respuesta[index].var_representation_acronime,
              respuesta[index].var_representation_id,
              respuesta[index].var_since
            )
          );
        }
        this.dataSource = new MatTableDataSource(this.dataTable);
      })
    });
  }
}

export class Result {
  constructor(
    public acronime_id: any,
    public date: any,
    public parent_acronime: any,
    public parent_representation: any,
    public representation_acronime: any,
    public representation_frequency: any,
    public representation_id: any,
    public representation_since: any,
    public var_frequency: any,
    public var_representation_acronime: any,
    public var_representation_id: any,
    public var_since: any) {
  }
}