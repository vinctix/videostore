import { Movie } from "./Movie";

export class ChildrensMovie extends Movie {
  constructor(title: string) {
    super(title);
  }

  determineAmount(daysRented: number) {
    if (daysRented > 3) {
      return 1.5 + (daysRented - 3) * 1.5;
    }
    return 1.5;
  }

  determineFrequentRenterPoints(daysRented: number): number {
    return 1;
  }
}
