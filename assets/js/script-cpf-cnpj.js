$(document).ready(function(){

    // function validarCPFeCNPJ(campo){
    //     var documento = $(campo).val().replace(/[^\d]+/g,'');

    //     // Verifica se o documento está vazio
    //     if (documento == '') {
    //         $('#invalidDocumentoMsg').text('Por favor, insira um CPF ou CNPJ.');
    //         $('#id-cpf-cnpj').addClass('is-invalid');
    //         return false;
    //     }

    //     // Verifica se o documento é um CPF válido
    //     if (documento.length === 11) {
    //         if (!validarCPF(documento)) {
    //             $('#invalidDocumentoMsg').text('CPF inválido.');
    //             $('#id-cpf-cnpj').removeClass('is-valid');
    //             $('#id-cpf-cnpj').addClass('is-invalid');
    //             return false;
    //         }else{
    //             $('#validDocumentoMsg').text('CPF válido.');
    //             $('#id-cpf-cnpj').removeClass('is-invalid');
    //             $('#id-cpf-cnpj').addClass('is-valid');
    //             return true;
    //         }
    //     }
    //     // Verifica se o documento é um CNPJ válido
    //     else if (documento.length === 14) {
    //         if (!validarCNPJ(documento)) {
    //             $('#invalidDocumentoMsg').text('CNPJ inválido.');
    //             $('#id-cpf-cnpj').addClass('is-invalid');
    //             $('#id-cpf-cnpj').removeClass('is-valid');
    //             return false;
    //         }else{
    //             $('#validDocumentoMsg').text('CNPJ válido.');
    //             $('#id-cpf-cnpj').removeClass('is-invalid');
    //             $('#id-cpf-cnpj').addClass('is-valid');
    //             return true;
    //         }
    //     }
    //     // Se o documento não tem 11 ou 14 dígitos, é inválido
    //     else {
    //         $('#invalidDocumentoMsg').text('CPF ou CNPJ deve ter 11 ou 14 dígitos.');
    //         $('#id-cpf-cnpj').addClass('is-invalid');
    //         return false;
    //     }

    //     // Se chegou até aqui, o documento é válido
    //     $('#id-cpf-cnpj').removeClass('is-invalid');
    //     return true;
    // }

    $('#second-step').on('click', function(event) {
        var documento = $('#cpf_cnpj').val().replace(/[^\d]+/g,'');

        // Verifica se o documento está vazio
        if (documento == '') {
            $('#invalidDocumentoMsg').text('Por favor, insira um CPF ou CNPJ.');
            $('#cpf_cnpj').addClass('is-invalid');
            return false;
        }

        // Verifica se o documento é um CPF válido
        if (documento.length === 11) {
            if (!validarCPF(documento)) {
                $('#invalidDocumentoMsg').text('CPF inválido.');
                $('#cpf_cnpj').removeClass('is-valid');
                $('#cpf_cnpj').addClass('is-invalid');
                return false;
            }else{
                $('#validDocumentoMsg').text('CPF válido.');
                $('#cpf_cnpj').removeClass('is-invalid');
                $('#cpf_cnpj').addClass('is-valid');
                return true;
            }
        }
        // Verifica se o documento é um CNPJ válido
        else if (documento.length === 14) {
            if (!validarCNPJ(documento)) {
                $('#invalidDocumentoMsg').text('CNPJ inválido.');
                $('#cpf_cnpj').addClass('is-invalid');
                $('#cpf_cnpj').removeClass('is-valid');
                return false;
            }else{
                $('#validDocumentoMsg').text('CNPJ válido.');
                $('#cpf_cnpj').removeClass('is-invalid');
                $('#cpf_cnpj').addClass('is-valid');
                return true;
            }
        }
        // Se o documento não tem 11 ou 14 dígitos, é inválido
        else {
            $('#invalidDocumentoMsg').text('CPF ou CNPJ deve ter 11 ou 14 dígitos.');
            $('#cpf_cnpj').addClass('is-invalid');
            return false;
        }

        // Se chegou até aqui, o documento é válido
        $('#id-cpf-cnpj').removeClass('is-invalid');
        return true;
    });
    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');
        if(cpf == '') return false;
        // Elimina CPFs invalidos conhecidos
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
                return false;
        // Valida 1o digito
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    // Função para validar CNPJ
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g,'');
        if(cnpj == '') return false;

        if (cnpj.length != 14) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) return false;

        // Calcula o primeiro dígito verificador
        var tamanho = cnpj.length - 2;
        var numeros = cnpj.substring(0,tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;

        // Calcula o segundo dígito verificador
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;

        return true;
    }

});