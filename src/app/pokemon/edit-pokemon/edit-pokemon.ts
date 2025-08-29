import { Component } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form';
@Component({
  selector: 'app-edit-pokemon',
  imports: [CommonModule,PokemonFormComponent],
  template: `
    <h2 class="center">Editer {{pokemon?.name}}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture">
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: ``
})

export class EditPokemonComponent implements OnInit {
  

  route = inject(ActivatedRoute);
  pokermonService = inject(PokemonService);
  pokemon: Pokemon|undefined;

  ngOnInit(): void {
    const pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    
    if(pokemonId) {
      this.pokemon = this.pokermonService.getPokemonById(pokemonId);
    }
    else {
      this.pokemon = undefined;
    }
  }
}
