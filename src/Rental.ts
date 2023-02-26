import { Movie } from "./Movie";

export class Rental {
  constructor(
    private readonly movie: Movie,
    private readonly daysRented: number
  ) {}

  getDaysRented(): number {
    return this.daysRented;
  }

  getMovie(): Movie {
    return this.movie;
  }
}
