import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../loader/loader';

@Component({
  selector: 'app-pokemon-form',
  imports: [LoaderComponent,CommonModule,FormsModule,PokemonTypeColorPipe],
  templateUrl: './pokemon-form.html',
  styles: `.ng-valid[required] { border-left: 5px solid green; }
           .ng-invalid:not(form) { border-left: 5px solid red; }`
})

export class PokemonFormComponent {

  router = inject(Router);
  pokemonService = inject(PokemonService);
  types = this.pokemonService.getPokemonTypeList();
  isEdit = this.router.url.includes('edit');
  
  @Input() pokemon: Pokemon|undefined;


  hasType(type : string) : boolean {
    return this.pokemon?.types.includes(type) || false;
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      this.pokemon?.types.push(type);
    }
    else {
      const index = this.pokemon?.types.indexOf(type, 0);
      if (index !== undefined && index > -1) {
        this.pokemon?.types.splice(index, 1);
      }
    }
  }

  isTypesValid(type: string) : boolean {

    if(this.pokemon?.types.length == 1 && this.hasType(type)) {
      return false;
    }

    if(this.pokemon?.types && this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    console.log('Submit form !');
    
    if(this.isEdit) {
      this.router.navigate(['/pokemon', this.pokemon?.id]);
    }
    else {
      this.pokemonService.addPokemon(this.pokemon as Pokemon);
      this.router.navigate(['/pokemon', this.pokemon?.id]);
    }
  }
}
