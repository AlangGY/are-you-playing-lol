export interface Perks {
  perkIds: number[];
  perkStyle: Perk;
  perkSubStyle: Perk;
}

export interface Perk {
  id: number;
  name: string;
  image: {
    square: string;
  };
}
