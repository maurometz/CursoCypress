const locators = {
    LOGIN: {
        USER: '.input-group > .form-control',
        PASSWORD: ':nth-child(2) > .form-control',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '.dropdown-toggle',
        CONTAS: '[href="/contas"]',
        RESET:'[href="/reset"]'
    },
    CONTAS: {
        NOME: '.form-control',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: 
        // ':nth-child(7) > :nth-child(2) > .fa-edit'
        "//table//td[contains(., 'First Account')]/..//i[@class='far fa-edit']"
    },
    MESSAGE: '.toast-message' 
}   

export default locators;