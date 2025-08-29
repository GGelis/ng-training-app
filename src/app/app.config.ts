import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { ListPokemonComponent } from './pokemon/list-pokemon/list-pokemon';
import { DetailPokemonComponent } from './pokemon/detail-pokemon/detail-pokemon';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { PokemonService } from './pokemon/pokemon.service';
import { BasicPokemonService } from './pokemon/pokemon-impl.service';
import { EditPokemonComponent } from './pokemon/edit-pokemon/edit-pokemon';
import { provideHttpClient } from '@angular/common/http';
import { AddPokemonComponent } from './pokemon/add-pokemon/add-pokemon';
import { CanActivateFn } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const routes: Routes = [
    {path: 'pokemon/edit/:id', component: EditPokemonComponent, canActivate: [authGuard]},
    {path: 'pokemon/add', component: AddPokemonComponent, canActivate: [authGuard]},
    {path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [authGuard]},
    {path: 'pokemons', component: ListPokemonComponent, canActivate: [authGuard]},
    {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

export function pokemonServiceFactory(): PokemonService {
    return new BasicPokemonService();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: PokemonService,
      useFactory: pokemonServiceFactory 
    },
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};


