
describe("Movie page", () => {
  it("renders a movie title", () => {
    cy.visit("http://localhost:5080/movies/1");
    cy.get("h1").should("not.be.empty");
  });
});




/*describe('filter page', () => {
  it('filters online challenges', () => {
    cy.visit('http://localhost:5500/classes/a3/a312/examples/test-manual/index.html');
    cy.get('button').contains('online').click();
    cy.get('ul li').should('have.length', 15);
  })*/
