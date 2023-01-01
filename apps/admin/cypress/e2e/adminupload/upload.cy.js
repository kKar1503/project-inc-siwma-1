describe('Admin uploading a advertisement', () => {
  it('Loads successfully', () => {
    cy.visit('http://localhost:3001/AdminUpload');
  });

  it('Input company advertisment details', () => {
    cy.visit('http://localhost:3001/AdminUpload');
    // check that description box is diabled when company is not selected
    cy.get('#description').should('be.disabled');
    cy.get('#link').should('be.disabled');
    cy.get('#file_upload').should('be.disabled');
    cy.get('#submitpic').should('be.disabled');
    // Search company's name and select
    cy.get('#search').type('A&G EQUIPMENT PTE.LTD.');
    cy.get('[type="radio"]').check();

    // company selected, input description
    cy.get('#description').type(
      'A&G EQUIPMENT PTE.LTD. is selling ONE TON of metal sheet at 10% off!'
    );
    // input company's link
    cy.get('#link').type('http://A&G.com');
    // To save the descriptions, it must have a value
    cy.get('#description').should(
      'have.value',
      'A&G EQUIPMENT PTE.LTD. is selling ONE TON of metal sheet at 10% off!'
    );
    cy.get('#save').click();
    // check that upload file box is enabled when company is selected
    cy.get('#file_upload').should('be.enabled');
    // check that upload file button is disabled before file is uploaded
    cy.get('#submitpic').should('be.disabled');
    // upload file
    cy.get('#file_upload').attachFile('test.png');
    // check that upload file button is enabled after file is uploaded
    cy.get('#submitpic').should('be.enabled');
    // submit file
    cy.get('#submitpic').click();
  });

  // it('Enter description and link', () => {
  //   cy.visit('http://localhost:3001/AdminUpload');
  //   cy.get('#description').type('A&G EQUIPMENT PTE.LTD. is selling ONE TON of metal sheet at 10% off!');
  //   cy.get('#link').type(
  //     'www.A&G.com'
  //   );
  //   cy.get('#description').should('have.value').then(
  //     cy.get('[type="submit"]').click()
  //   )

  // });
});
