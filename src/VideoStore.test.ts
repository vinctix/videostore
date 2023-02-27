import { Statement } from "./Statement";
import { Movie } from "./Movie";
import { Rental } from "./Rental";

describe("Videostore tests", () => {
  let statement: Statement;
  let newReleaseMovie1: Movie;
  let newReleaseMovie2: Movie;
  let childrenMovie: Movie;
  let regularMovie1: Movie;
  let regularMovie2: Movie;
  let regularMovie3: Movie;

  beforeEach(() => {
    statement = new Statement("Customer");
    newReleaseMovie1 = new Movie("New Release 1", Movie.NEW_RELEASE);
    newReleaseMovie2 = new Movie("New Release 2", Movie.NEW_RELEASE);
    childrenMovie = new Movie("Children Movie", Movie.CHILDRENS);
    regularMovie1 = new Movie("Regular Movie 1", Movie.REGULAR);
    regularMovie2 = new Movie("Regular Movie 2", Movie.REGULAR);
    regularMovie3 = new Movie("Regular Movie 3", Movie.REGULAR);
  });

  test("Test single new release statement totals", () => {
    statement.addRental(new Rental(newReleaseMovie1, 3));
    statement.generate();

    expect(statement.getTotal()).toBe(9);
    expect(statement.getFrequentRenterPoints()).toBe(2);
  });

  test("test dual new release statement totals", () => {
    statement.addRental(new Rental(newReleaseMovie1, 3));
    statement.addRental(new Rental(newReleaseMovie2, 3));
    statement.generate();

    expect(statement.getTotal()).toBe(18);
    expect(statement.getFrequentRenterPoints()).toBe(4);
  });

  test("test single childrens statement totals", () => {
    statement.addRental(new Rental(childrenMovie, 3));
    statement.generate();
    expect(statement.getTotal()).toBe(1.5);
    expect(statement.getFrequentRenterPoints()).toBe(1);
  });

  test("test multiple regular statement totals", () => {
    statement.addRental(new Rental(regularMovie1, 1));
    statement.addRental(new Rental(regularMovie2, 2));
    statement.addRental(new Rental(regularMovie3, 3));

    statement.generate();
    expect(statement.getTotal()).toBe(7.5);
    expect(statement.getFrequentRenterPoints()).toBe(3);
  });

  test("test multiple regular statement format", () => {
    statement.addRental(new Rental(regularMovie1, 1));
    statement.addRental(new Rental(regularMovie2, 2));
    statement.addRental(new Rental(regularMovie3, 3));

    expect(statement.generate()).toBe(
      "Rental Record for Customer\n" +
        "\tRegular Movie 1\t2.0\n" +
        "\tRegular Movie 2\t2.0\n" +
        "\tRegular Movie 3\t3.5\n" +
        "You owed 7.5\n" +
        "You earned 3 frequent renter points\n"
    );
  });
});
