import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from '../services';
import { NamedAPIResource, NamedAPIResourceList } from '../types';

@Component({
  selector: 'pokedex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  public itemsPerPage: number = 12;
  // @TODO: currentPage becomes a BehaviorSubject in order to work with data$ -- 1 ora
  public currentPage: number = 1;
  // @TODO: document below -- ?
  public data$: Observable<any> = this.dataService
    .getPokemons(this.itemsPerPage, this.currentPage + 0)
    .pipe(
      switchMap((pokemonsData: NamedAPIResourceList) =>
        zip(
          pokemonsData.results.map((pokemon: NamedAPIResource) =>
            this.dataService.getPokemon(pokemon.name)
          )
        ).pipe(
          map((pokemons: any[]) => ({
            pokemons,
            totalPokemons: pokemonsData,
          }))
        )
      )
    );

  constructor(private dataService: DataService) {}

  public pageChange(currentPage: number): void {
    this.currentPage = currentPage;
  }
}
