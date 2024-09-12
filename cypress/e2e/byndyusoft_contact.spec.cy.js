describe('Check Byndyusoft Contact Information', () => {
  it('should verify the email and phone number on Byndyusoft website', () => {
       cy.visit('https://www.google.ru/');

    // Step: Ждем загрузки гугла и появление элемента textarea куда мы вводим поисковой запрос
    cy.get('textarea[name="q"]', { timeout: 10000 })      .should('be.visible')
		
      .type('Byndyusoft{enter}');   
    // берем первую ссылку
    cy.get('#search a').first().should('be.visible')
      .invoke('removeAttr', 'target') // запрещаем открывать новую вкладку, открываем в той же
      .click();

    // Step 2: Так как не работал с кипресс, не совсем понимаю в какой момент выпадает из контекста 
    // переход по ссылке, поэтому такой костыль
    cy.origin('https://byndyusoft.com', () => {
      cy.get('footer', { timeout: 20000 }).should('be.visible'); // страница подгрузилась полностью

      cy.get('footer') 
        .scrollIntoView({ duration: 2000 }); 

      // Step 3: Click on "Заказать презентацию" button
      cy.get('.btn.btn--lg.btn--info.js-popup-callback-show', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });  

      // Step 4: Проверяем - видим лы мы модальное окно?
      cy.get('.popup-callback__contacts', { timeout: 10000 }).should('be.visible');

      // Step 5: Verify the contact email address is present
      cy.contains('.popup-callback__contacts', 'sales@byndyusoft.com').should('be.visible');

      // Step 6: Verify the contact phone number is present
      // В форме телефона нет, поэтому тест упадет. Или форма изменилась и тз старое или проверка на вшивость.
      cy.contains('.popup-callback__contacts', '8 800 775-15-21').should('be.visible');
    });
  });
});
