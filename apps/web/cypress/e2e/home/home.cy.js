describe('Home page', () => {
  it('Loads successfully', () => {
    cy.visit('/');
  });

  it('Pressing on View all categories button navigates to categories page', () => {
    cy.visit('/');
    cy.get('[data-cy="view-all-categories"]').click();
    cy.url().should('include', '/categories');
  });

  it('Clicking on a category navigates to /category/[name]', () => {
    // This is the category name that will be tested
    cy.visit('/');
    const firstCategoryItem = cy.get('[data-cy="category"]').first();

    firstCategoryItem.invoke('text').then((categoryName) => {
      // Get the first category item again and click it
      cy.get('[data-cy="category"]').first().click();

      // Encode the category name, all spaces will be replaced with %20 and etc.
      const completeHrefString = `/category/${encodeURIComponent(categoryName)}`;

      // Log the full href string to the console
      cy.log(completeHrefString);

      // Check that the 'href' part of the URL should include the complete href string.
      // Which means if the URL is http://localhost:3000/category/Category%20Name
      // then the test will pass
      cy.url('href').should('include', completeHrefString);
    });
  });

  it('Clicking on a product listing navigates to /product/[product_id]', () => {
    // split("-").splice(1).join("-")
    cy.visit('http://localhost:3000');
    const firstProductListingItem = cy.get('[data-cy^="product-"]').first();
    firstProductListingItem.click();
    // cy.log(firstProductListingItem);
    cy.url('href').should('include', '/product/');
  });
});
