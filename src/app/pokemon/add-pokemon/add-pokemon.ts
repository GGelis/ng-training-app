import { Component } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form';

@Component({
  selector: 'app-add-pokemon',
  imports: [PokemonFormComponent],
  template: `
    <h2 class="center card">Ajouter un pokémon</h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: ``
})

export class AddPokemonComponent {

  pokemon : Pokemon =
  {
      id: 0,
      name: 'Entrez un nom',
      hp: 100,
      cp: 10,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png',
      types: ['Normal'],
      created: new Date()
  };
}
