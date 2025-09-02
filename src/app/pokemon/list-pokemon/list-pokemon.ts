import { Component } from '@angular/core';
import { Pokemon, getPokemonColor } from '../pokemon.model';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { RouterModule } from '@angular/router';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon';
import { OnInit } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list-pokemon',
  imports: [SearchPokemonComponent,CommonModule,PokemonTypeColorPipe,RouterModule,DndModule],
  templateUrl: './list-pokemon.html',
  styleUrls: ['./list-pokemon.scss']
})

export class ListPokemonComponent implements OnInit {
  pokemonService = inject(PokemonService);
  pokemonList = this.pokemonService.getPokemonList();
  bannerTexts = [
  'Bienvenue sur le Pokédex !',
  'Découvrez les Pokémons !',
  'Attrapez-les tous !',
  'Améliorez vos compétences !'
];

  bannerText = this.bannerTexts[0];
  currentIndex = 0;


  startIndex: number = -1;
  @ViewChildren('card', { read: ElementRef }) cardEls!: QueryList<ElementRef<HTMLElement>>;
  
  dndStart(event: any, i: number): void {
    this.startIndex = i;
  }
  
  dndEnd(event: any): void {
    const elements = document.elementsFromPoint(event.x, event.y) as HTMLElement[];
    const cardUnderCursor = elements
      .map(el => el.closest('.pokemon-card') as HTMLElement | null)
      .find(el => el !== null) as HTMLElement | undefined;
    const arr = this.cardEls.toArray();
    const found = arr.findIndex(ref => ref.nativeElement === cardUnderCursor);
    this.moveInArray(this.pokemonList, this.startIndex, found);
    
  }

  private moveInArray<T>(arr: T[], from: number, to: number) {
    if (from < 0 || from >= arr.length) return;
    if (to < 0 || to >= arr.length) return;
    let temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
  }

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.bannerTexts.length;
      this.bannerText = this.bannerTexts[this.currentIndex];
    }, 3000);
  }

  constructor(private router: Router) {}

  goToPokemon(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  generateBordelColor(types: [string, string?, string?]) {

    if (types[1] === undefined && types[2] === undefined) {
    return `
      border-radius: 12px;
      border: 5px solid transparent;
      background: linear-gradient(${getPokemonColor(types[0])}, ${getPokemonColor(types[0])}) padding-box,
                  linear-gradient(${getPokemonColor(types[0])}, ${getPokemonColor(types[0])}) border-box;
    `;
  } 
    else if (types[1] !== undefined && types[2] === undefined) {
      return `
        border-radius: 12px;
        border: 5px solid transparent;
        background: linear-gradient(to right, ${getPokemonColor(types[0])}, ${getPokemonColor(types[1])}) padding-box,
                    linear-gradient(to right, ${getPokemonColor(types[0])}, ${getPokemonColor(types[1])}) border-box;
      `;
    } 
    else if (types[1] === undefined && types[2] !== undefined) {
      return `
        border-radius: 12px;
        border: 5px solid transparent;
        background: linear-gradient(to right, ${getPokemonColor(types[0])}, ${getPokemonColor(types[2])}) padding-box,
                    linear-gradient(to right, ${getPokemonColor(types[0])}, ${getPokemonColor(types[2])}) border-box;
      `;
    } 
    else if (types[1] !== undefined && types[2] !== undefined) {
      return `
        border-radius: 12px;
        border: 5px solid transparent;
        background: linear-gradient(to right, 
                      ${getPokemonColor(types[0])} 0%, 
                      ${getPokemonColor(types[0])} 33%, 
                      ${getPokemonColor(types[1])} 33%, 
                      ${getPokemonColor(types[1])} 66%, 
                      ${getPokemonColor(types[2])} 66%, 
                      ${getPokemonColor(types[2])} 100%) padding-box,
                    linear-gradient(to right, 
                      ${getPokemonColor(types[0])} 0%, 
                      ${getPokemonColor(types[0])} 33%, 
                      ${getPokemonColor(types[1])} 33%, 
                      ${getPokemonColor(types[1])} 66%, 
                      ${getPokemonColor(types[2])} 66%, 
                      ${getPokemonColor(types[2])} 100%) border-box;
      `;
    } 
    else {
      return `
        border-radius: 12px;
        border: 5px solid #303030;
        background: #f5f5f5;
      `;
    }
  }
}
