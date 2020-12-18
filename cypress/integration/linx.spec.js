/// <reference types="cypress" />


describe.skip('Login aplicacao',  () =>{

    it('Criacão de novo usuario', () =>{

       cy.visit('http://automationpractice.com/index.php') //acessa o site

       cy.screenshot('home') 

       cy.get('.login').click() //class - clica no botão Sign in

       cy.get('#email_create').type('nichollas.barros3@gmail.com') //id - preenche o email

       cy.get('#SubmitCreate').click() //id - clica no botão Create an Account
 
       cy.get('#id_gender1').click().should('to.be.checked') //id - garante que o botão genero masculino esteja marcado
       cy.get('#id_gender2').should('not.to.be.checked') //id - garante que o botão genero feminino não esteja marcado
       
       cy.get('#customer_firstname').type('Nichollas') //id - preenche o nome

       cy.get('#customer_lastname').type('Barros') //id - preenche o sobrenome

       cy.get('#passwd').type('abc123') //id - preenche a senha

       cy.get('#days').select('15').should('have.value', '15') //id - selecionando a data de nascimento
       cy.get('#months').select('November').should('have.value', '11') //id - selecionando a data de nascimento
       cy.get('#years').select('1985').should('have.value', '1985') //id - selecionando a data de nascimento


       cy.get('#newsletter').click().should('to.be.checked') //id - garante que o check esteja marcado.
       cy.get('#optin').should('not.to.be.checked') //id - garante que o check NÃO esteja marcado.

       //cy.get('#firstname').type('Nichollas') //id - preenche o nome
       //cy.get('#lastname').type('Barros') //id - preenche o sobrenome
       cy.get('#address1').type('Rua do Brasil 123') //id - preenche o endereço
       cy.get('#city').type('Porto Alegre') //id - preenche a cidade
       
       cy.get('#postcode').type('90230') //id - preenche a cidade
       cy.get('#id_country').select('United States').should('have.value', '21') //id - selecionando o pais e valida o retorno
       cy.get('#id_state').select('Colorado').should('have.value', '6') //name - selecionando o estado e valida o retorno

       cy.get('#phone_mobile').type('51999094169') //id - preenche o telefone

       cy.get('#alias').clear() //id - limpa o campo antes de preencher
       cy.get('#alias').type('minha casa') //id - preenche o alias

       cy.screenshot('formulario preenchido')

       cy.get('#submitAccount').click() //id - clica no botão Sign in

       cy.screenshot('usuario criado')


        })
})

describe('Login aplicacao',  () =>{

    before(()  => {  //executa antes do primeiro teste
        cy.visit('http://automationpractice.com/index.php')     
        cy.get('.login').click() //class - clica no botão Sign in 
        
    })

    it('Login incorreto - sem senha', () =>{
        
        cy.get('#email').clear() //limpando o campo
        cy.get('#email').type('teste@teste.com') //id - preenche o campo email
        
        cy.get('#passwd').clear() //id -deixa o campo senha em branco

        cy.get('#SubmitLogin').click() //id - clica no botão Login
        cy.get('ol > li').should('have.text', 'Password is required.') //verificando o erro

        cy.screenshot('login_invalido sem senha')
        
    })

    it('Login incorreto - usuario inexistente', () =>{
        
        cy.get('#email').clear() //limpando o campo
        cy.get('#email').type('teste@teste.com') //id - preenche o campo email
        
        cy.get('#passwd').clear() //limpando o campo
        cy.get('#passwd').type('abcd1234')

        cy.get('#SubmitLogin').click() //id - clica no botão Login
        cy.get('ol > li').should('have.text', 'Authentication failed.') //verificando o erro

        cy.screenshot('login_invalido - usuario inexistente')
        
    })

    it('Login sucesso', () =>{
        cy.get('#email').clear() //limpando o campo
        cy.get('#email').type('nichollas.barros@gmail.com') //id - preenche o campo email

        cy.get('#passwd').clear() //limpando o campo
        cy.get('#passwd').type('abc123') //id -deixa o campo senha em branco
        cy.get('#SubmitLogin').click() //id - clica no botão Login
        
        cy.get('.account').should('have.text', 'Nichollas Barros') //validando o login correto
        
        cy.screenshot('login_valido')

        cy.get('.logo').click()
    })
    

    it('Selecionando 1o produto', () =>{


        cy.get('#search_query_top').type("Printed Chiffon Dress")
        cy.get('#searchbox > .btn').click()

        cy.get('.first-in-line > .product-container > .right-block > h5 > .product-name').click()

           
        cy.get('#group_1')
        .select('M')
        .should('have.value', '2') //id - selecionando o tamanho M
       
        cy.get('#color_15').click() //id - escolhendo a cor verde

        cy.get('#add_to_cart > .exclusive').click() //adicionando ao carrinho

        cy.screenshot('produto_no_carrinho')
        
        cy.get('.cart_navigation > .button > span').click() //clicando em Proceed to checkout



    })

    it('Carrinho de compra', () =>{

        
        
        cy.get('#ordermsg > .form-control').type('Compras de Natal') //preenchendo o campo comentarios

        cy.get('.cart_navigation > .button > span').click()//clicando em Proceed to checkout

        cy.get('#cgv').click().should('to.be.checked')  //confirmando os termos de serviço

    })

    it('Pagamento', () =>{

        cy.get('.bankwire').click //selecionando o tipo de pagamento

        cy.get('#cart_navigation > .button > span').click() //confirmando o pedido

        cy.get('.cheque-indent > .dark').should('have.text', 'Your order on My Store is complete.')

        cy.screenshot('compra_completa')

    })
    
})
