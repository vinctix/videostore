import { Movie } from "./Movie";

export class RegularMovie extends Movie {
  constructor(title: string) {
    super(title);
  }

  determineAmount(daysRented: number) {
    if (daysRented > 2) {
      return 2 + (daysRented - 2) * 1.5;
    }

    return 2;
  }

  determineFrequentRenterPoints(daysRented: number): number {
    return 1;
  }
}
