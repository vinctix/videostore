import { Statement } from "./Statement";
import { Movie } from "./Movie";
import { Rental } from "./Rental";
import { NewReleaseMovie } from "./NewReleaseMovie";
import { ChildrensMovie } from "./ChildrensMovie";
import { RegularMovie } from "./RegularMovie";

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
    newReleaseMovie1 = new NewReleaseMovie("New Release 1");
    newReleaseMovie2 = new NewReleaseMovie("New Release 2");
    childrenMovie = new ChildrensMovie("Children Movie");
    regularMovie1 = new RegularMovie("Regular Movie 1");
    regularMovie2 = new RegularMovie("Regular Movie 2");
    regularMovie3 = new RegularMovie("Regular Movie 3");
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
