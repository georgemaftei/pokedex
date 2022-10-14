import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pokemon } from '../types';

@Component({
  selector: 'pokedex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  public pokemon!: Pokemon;
  public pokemons!: Pokemon;
}

//de facut clase de css pentru fiecare tip de pokemon -- 2 ore
//de adaugat clasa pe card cu host binding(clasa este tipul pokemonului) -- 3 ore
//de facut paginarea -- 4 ore
//de adaugat track by pe toate ngFor -- 2 ore
//de stilizat cardul -- 3 ore
//de migrat la angular 14 -- 1 ora
//de adaugat documentatie(jsdocs) la cum obtinem pokemonii si la functiile din data service -- 4 ore
