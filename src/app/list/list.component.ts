import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
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

  getPokemons() {
    this.dataService.getPokemons(12, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach((result: { name: string; }) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);

            });
        });
      });
  }

}

