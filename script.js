let validatorA = {
    handleSubmit: (event) => {
        //previne a função padrão do botão
        event.preventDefault();
        //enviar o formulário
        let send = true;

        //entra no formulário(form.) e seleciona todos os inputs
        let inputs = form.querySelectorAll('input');

        validatorA.clearErrors();

        //1- fazer um loop em cada input
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validatorA.checkInput(input);
            //2- checar todos os inputs 
            if (check !== true) {
                //nao enviar o formulário
                send = false;
                //mostrar o erro                           
                validatorA.showError(input, check);
            }
        }
        if (send) {
            form.submit();
        }
    },

    //recebe o próprio input
    checkInput: (input) => {
        //verificar se tem alguma regra 
        //definir uma variável para pegar um atributo do input
        let rules = input.getAttribute('data-rules')
        //se tiver uma regra, verificar cada uma delas
        if (rules !== null) {
            //.split permite partir a string com base no caracter separador ("|")
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                //verificar cada uma das regras
                switch (rDetails[0]) {
                    //required define que o campo é obrigatório
                    case 'required':
                        //então, se o campo estiver vazio, mostrar tal mensagem
                        if (input.value == '') {
                            return 'Este campo é obrigatório.'
                        }
                        break;
                    //define que o campo deve ter uma quantidade mínima de caracteres
                    case 'min':
                        //o .value.length verifica no "=" quantos caracteres tem no input. se tiver menos caracteres que o
                        //definido, mostrar tal mensagem 
                        if (input.value.length < rDetails[1]) {
                            return 'O campo precisa ter pelo menos ' + rDetails[1] + ' caracteres';
                        }
                        break;
                    //validador do e-mail
                    case 'email':
                        if (input.value != '') {
                            //expressão regular para validar e-mail
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'O email não é válido';
                            }
                        }
                        break;
                }
            }
        }
        return true;
    },
    //onde eu quero adicionar, o que vai ser adicionado
    showError: (input, error) => {
        //customize input 
        input.style.borderColor = '#ff0000'
        //criar um elemento (uma div) que irá ser usada para exibir o erro
        let errorElement = document.createElement('div')
        //adicionar uma classe que irá personalizar o aviso de erro
        errorElement.classList.add('error')
        errorElement.innerHTML = error;
        //buscar onde adicionar o erro; buscar o elemento pai dele, para não adicionar junto da familia
        //escolher adicionar antes ou depois do elemento pai(onde adicionar, o que adicionar)
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    //limpar os erros após o usuário corrigir algo que estava faltando
    clearErrors: () => {
        //seleciona todos os inputs
        let inputs = document.querySelectorAll("input")
        //para cada input que não estiver vazio, e estiver respeitando as condições impostas, remover o style
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = ''
        }
        //pela lógica, deve selecionar todos os lugares que tiverem a classe 'error'
        let errorElements = document.querySelectorAll('.error')
        //dar um for loop para cada lugar que tiver a classe 'error', que irá executar o seguinte comando para excluir a classe
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }
}
function showPass() {
    //seleciona o campo que preenche a senha
    let senha = document.querySelector('.pass')
    //seleciona o botão que irá executar a função de mostrar senha
    let input = document.querySelector('.hidePass')
    //mudar o tipo de input da senha de acordo com as condições
    if (senha.type == 'password') {
        senha.type = 'text'
        input.value = 'Ocultar senha'
    } else {
        senha.type = 'password'
        input.value = 'Mostrar senha'
    }
}

let form = document.querySelector('.validator1');
form.addEventListener('submit', validatorA.handleSubmit)