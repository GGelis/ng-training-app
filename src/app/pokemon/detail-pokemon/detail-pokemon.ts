import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';
import { LoaderComponent } from '../../loader/loader';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-detail-pokemon',
  imports: [LoaderComponent,CommonModule,PokemonTypeColorPipe],
  templateUrl: './detail-pokemon.html',
  styleUrls: ['./detail-pokemon.scss'],
  animations: [
    trigger('testAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('750ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})

export class DetailPokemonComponent {

  route = inject(ActivatedRoute);
  router = inject(Router);
  pokemonService = inject(PokemonService);
  pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  pokemon = this.pokemonService.getPokemonById(this.pokemonId);

  goToPokemonList(): void {
    this.router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon/edit', this.pokemonId]);
  }

  deletePokemon(pokemon: Pokemon): void {
    if(confirm(`Etes-vous sûr de vouloir supprimer ${pokemon.name} ?`)) {
      this.pokemonService.deletePokemon(pokemon.id);
      this.router.navigate(['/pokemons']);
    }
  }
}
