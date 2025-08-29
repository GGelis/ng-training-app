import { POKEMONS } from './mock-pokemon-list';
import { Pokemon, PokemonList } from './pokemon.model';
import { PokemonService } from './pokemon.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class BasicPokemonService implements PokemonService {

    private pokemons: PokemonList = POKEMONS;

  getPokemonList(): PokemonList {
    return this.pokemons;
  }

  getPokemonById(id: number): Pokemon|undefined {
    const pokemon = this.pokemons.find((p) => p.id == id);
    return pokemon;
  }

  updatePokemon(pokemon: Pokemon): Pokemon {
    const index = this.pokemons.findIndex((p) => p.id == pokemon.id);
    if (index !== -1) {
      this.pokemons[index] = pokemon;
    }
    return pokemon;
  }

  deletePokemon(pokemonId: number): void {
    this.pokemons = this.pokemons.filter((p) => p.id !== pokemonId);
  }

  addPokemon(pokemon: Pokemon): Pokemon {
    pokemon.id = this.pokemons.length + 1;
    this.pokemons.push(pokemon);
    return pokemon;
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }

  searchPokemonList(term: string): Observable<PokemonList> {
    if(term.length <= 1) {
      return of([]);
    }
    return of(this.pokemons.filter((p) => 
      p.name.toLowerCase().includes(term.toLowerCase())
    ));
  }
}