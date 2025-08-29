import { Component } from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon, PokemonList } from '../pokemon.model';
import { BorderCardDirective} from '../border-card.directive';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { RouterModule } from '@angular/router';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon';

@Component({
  selector: 'app-list-pokemon',
  imports: [SearchPokemonComponent,CommonModule,BorderCardDirective,PokemonTypeColorPipe,RouterModule],
  templateUrl: './list-pokemon.html'
})

export class ListPokemonComponent {
  pokemonService = inject(PokemonService);
  pokemonList = this.pokemonService.getPokemonList();

  constructor(private router: Router) {}

  goToPokemon(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
