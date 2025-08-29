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