import { Component } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { PokemonList } from '../pokemon.model';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  imports: [CommonModule],
  templateUrl: './search-pokemon.html',
})

export class SearchPokemonComponent implements OnInit {

  router = inject(Router);
  pokemonService = inject(PokemonService);
  searchTerms = new Subject<string>();
  pokemons$: Observable<PokemonList> = new Observable<PokemonList>();

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
