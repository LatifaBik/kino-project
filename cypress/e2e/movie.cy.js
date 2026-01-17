
describe("Movie page", () => {
  it("renders a movie title", () => {
    cy.visit("http://localhost:5080/movies/1");
    cy.get("h1").should("not.be.empty");
  });
});





