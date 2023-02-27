import { Movie } from "./Movie";

export class Rental {
  constructor(
    private readonly movie: Movie,
    private readonly daysRented: number
  ) {}

  getDaysRented(): number {
    return this.daysRented;
  }

  getMovieTitle(): string {
    return this.movie.getTitle();
  }

  determineAmount() {
    return this.movie.determineAmount(this.daysRented);
  }

  determineFrequentRenterPoints(): number {
    return this.movie.determineFrequentRenterPoints(this.daysRented);
  }
}
