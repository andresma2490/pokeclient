export interface Paginator {
  count: number;
  next: string | null;
  previous: string | null;
  results: NameUrlObj[];
}

export interface NameUrlObj {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: NameUrlObj;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrlObj;
}

export interface Pokemon {
  id?: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  location_area_encounters: string;
  order: number;
  weight: number;
  stats: Stat[];
  types: Type[];
  /** non typed */
  species: any;
  sprites: any;
  abilities: any[];
  forms: any[];
  game_indices: any[];
  held_items: any[];
  moves: any[];
  past_types: any[];
  /** custom */
  description?: string;
}
