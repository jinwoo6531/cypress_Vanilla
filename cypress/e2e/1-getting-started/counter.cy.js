///<reference types="cypress" />

// - [ ] counter의 초기값은 0이다.
// - [ ] + 버튼을 클릭 시 count가 1증가한다.
// - [ ] - 버튼을 클릭 시 count가 1감소한다.
// - [ ] + 버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다. (Max 값이 10)
// - [ ] - 버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다. (Min 값이 0)
// - [ ] reset 버튼을 클릭 시 counter가 0으로 초기화된다.

describe('카운터앱', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('최초에 카운터 값을 0으로 보여준다.', () => {
    //invoke 는 value값 가져오는 함수
    //eq는 0과 비교
    cy.get('#value').invoke('text').should('eq', '0');
  });

  it('버튼을 클릭 시 count가 1증가한다.', () => {
    //먼저 기존 값을 가져오고,
    // + 버튼을 클릭한 다음에
    // 변화된 값이 기존값 +1인지 체크
    cy.get('#value')
      .invoke('text')
      .then((prev) => {
        const prevNumber = Number(prev);
        cy.get('.increase-btn').click();
        cy.get('#value')
          .invoke('text')
          .should('eq', String(prevNumber + 1));
      });
  });

  it('버튼을 클릭 시 count가 1감소한다.', () => {
    cy.get('.increase-btn').click();
    cy.get('#value')
      .invoke('text')
      .then((prev) => {
        const prevNumber = Number(prev);
        cy.get('.decrease-btn').click();
        cy.get('#value')
          .invoke('text')
          .should('eq', String(prevNumber - 1));
      });
  });

  it('버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다.', () => {
    for (let i = 0; i < 11; i++) {
      cy.get('.increase-btn').click();
    }
    cy.get('#value').invoke('text').should('eq', '10');
  });

  it('버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다.', () => {
    cy.get('.decrease-btn').click();
    cy.get('#value').invoke('text').should('eq', '0');
  });
});
