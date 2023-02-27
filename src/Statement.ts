import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Statement {
  private readonly rentales: Rental[] = [];
  private totalAmount = 0;
  private frequentRenterPoints = 0;

  constructor(private readonly customerName: string) {}

  addRental(rental: Rental) {
    this.rentales.push(rental);
  }

  generate() {
    this.clearTotals();
    let statementText = this.header();
    statementText += this.rentalLines();
    statementText += this.footer();
    return statementText;
  }

  private clearTotals() {
    this.totalAmount = 0;
    this.frequentRenterPoints = 0;
  }

  private header(): string {
    return `Rental Record for ${this.customerName}\n`;
  }

  private rentalLines() {
    let rentalLines = "";
    this.rentales.forEach((rental) => {
      rentalLines += this.rentalLine(rental);
    });
    return rentalLines;
  }

  private rentalLine(rental: Rental) {
    const rentalAmount = rental.determineAmount();
    this.frequentRenterPoints += rental.determineFrequentRenterPoints();
    this.totalAmount += rentalAmount;

    return this.formatRentalLine(rental, rentalAmount);
  }

  private formatRentalLine(rental: Rental, rentalAmount: number) {
    return `\t${rental.getMovieTitle()}\t${rentalAmount.toFixed(1)}\n`;
  }

  private footer() {
    return (
      `You owed ${this.totalAmount.toFixed(1)}\n` +
      `You earned ${this.frequentRenterPoints} frequent renter points\n`
    );
  }

  getTotal(): number {
    return this.totalAmount;
  }

  getFrequentRenterPoints(): number {
    return this.frequentRenterPoints;
  }
}
