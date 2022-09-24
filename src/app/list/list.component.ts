import { Component, OnInit } from '@angular/core';
import { concatMap, from, map, switchMap, take, toArray } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pokemons: any[]=[]
  page = 1;
  totalPokemons!: number;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.dataService.getPokemons(12, this.page + 0).pipe(
      map((response: any) => response.results),
      switchMap((items: any) => from(items).pipe(
        concatMap((item: any) => this.dataService.getMoreData(item.name).pipe(map(response => {
          this.pokemons.push(response);

        }))),
        toArray(),
      )),
      take(1)
    ).subscribe((response: any) => {
      this.totalPokemons = response.length;
      console.log(this.pokemons)
    });
  }
}