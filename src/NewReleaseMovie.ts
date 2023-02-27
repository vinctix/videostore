import { Movie } from "./Movie";

export class NewReleaseMovie extends Movie {
  constructor(title: string) {
    super(title);
  }

  determineAmount(daysRented: number) {
    return daysRented * 3;
  }

  determineFrequentRenterPoints(daysRented: number): number {
    return daysRented > 1 ? 2 : 1;
  }
}
