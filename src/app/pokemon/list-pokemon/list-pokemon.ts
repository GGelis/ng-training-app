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
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-list-pokemon',
  imports: [SearchPokemonComponent,CommonModule,PokemonTypeColorPipe,RouterModule],
  templateUrl: './list-pokemon.html',
  styleUrls: ['./list-pokemon.scss']
})

export class ListPokemonComponent implements OnInit {
  pokemonService = inject(PokemonService);
  pokemonList = this.pokemonService.getPokemonList();
  bannerTexts = [
  'Bienvenue sur le Pokédex !',
  'Découvrez tous les Pokémons !',
  'Attrapez-les tous !',
  'Améliorez vos compétences !'
];

  bannerText = this.bannerTexts[0];
  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.bannerTexts.length;
      this.bannerText = this.bannerTexts[this.currentIndex];
    }, 3000); // change tous les 3 secondes
  }

  constructor(private router: Router) {}

  goToPokemon(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
