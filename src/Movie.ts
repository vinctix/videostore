export abstract class Movie {
  constructor(private readonly title: string) {}

  getTitle(): string {
    return this.title;
  }

  abstract determineAmount(daysRented: number): number;

  abstract determineFrequentRenterPoints(daysRented: number): number;
}
