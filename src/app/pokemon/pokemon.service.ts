import { Pokemon, PokemonList } from './pokemon.model';
import { Observable } from 'rxjs';

export abstract class PokemonService {
  abstract getPokemonList(): PokemonList;
  abstract getPokemonById(id: number): Pokemon|undefined;
  abstract updatePokemon(pokemon: Pokemon): Pokemon|undefined;
  abstract deletePokemon(pokemonId: number): void;
  abstract addPokemon(pokemon: Pokemon): Pokemon;
  abstract getPokemonTypeList(): string[];
  abstract searchPokemonList(term: string): Observable<PokemonList>;
}
