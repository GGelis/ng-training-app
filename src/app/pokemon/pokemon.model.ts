export interface Pokemon {
    id: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: [string, string?, string?];
    created: Date;
}

export type PokemonList = Pokemon[];

export function getPokemonColor(type: string) {
  switch (type) {
    case 'Feu':
      return '#EF5350';
    case 'Eau':
      return '#42A5F5';
    case 'Plante':
      return '#66BB6A';
    case 'Insecte':
      return '#8d6e63';
    case 'Vol':
      return '#90CAF9';
    case 'Poison':
      return '#b388ff';
    case 'Fée':
      return '#f8bbd0';
    case 'Electrik':
      return '#f4ff81';
    case 'Normal':
      return '#706e6eff';
    default:
      return '#070303ff';
  }
}