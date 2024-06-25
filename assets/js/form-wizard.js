// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.querySelector(".form-wizard");
//     const fieldsets = form.querySelectorAll(".fieldset");
//     let currentStep = 0;

//     showStep(currentStep);

//     function showStep(step) {
//         fieldsets.forEach(function(fieldset, index) {
//             if (index === step) {
//                 fieldset.classList.add("active");  
//             } else {
//                 fieldset.classList.remove("active");
//             }
//         });
        
//         if (step === fieldsets.length - 1) {
//             // Último passo - alterar texto do botão para "Enviar"
//             form.querySelector(".next").style.display = "none";
//             form.querySelector(".prev").style.display = "inline-block";
//             form.querySelector("[type='submit']").style.display = "inline-block";
//         } else if(step > 0 & step < fieldsets.length - 1) {
//             form.querySelector(".next").style.display = "inline-block";
//             form.querySelector(".prev").style.display = "inline-block";
//             form.querySelector("[type='submit']").style.display = "none";
//         } else {
//             form.querySelector(".next").style.display = "inline-block";
//             form.querySelector(".prev").style.display = "none";
//             form.querySelector("[type='submit']").style.display = "none";
//         }
//     }

//     form.addEventListener("submit", function(e) {
//         e.preventDefault();
//         // Aqui você pode enviar o formulário via AJAX ou da forma que preferir
//         // Exemplo simples de envio do formulário:
//         // form.submit();
//         alert("Formulário enviado!");
//     });

//     form.querySelectorAll(".next").forEach(function(button) {
//         button.addEventListener("click", function() {
//             // Validação básica do formulário (pode ser melhorada conforme necessário)
//             const currentFieldset = fieldsets[currentStep];
//             const inputs = currentFieldset.querySelectorAll("input, textarea");

//             let isValid = true;
//             inputs.forEach(function(input) {
//                 if (input.required && (!input.value.trim() || input.id ==='cpf_cnpj')) {
//                     if(input.id ==='cpf_cnpj'){
//                         isValid = validarCPFeCNPJ('#cpf_cpnj', '#invalidDocumentoMsg', '#validDocumentoMsg');
//                     }else{
//                         isValid = false;
//                         input.classList.add('is-invalid')
//                         input.classList.remove('is-valid')
//                     }                    
//                 }else if(input.id != "switch-pj"){
//                     input.classList.add('is-valid')
//                     input.classList.remove('is-invalid')   
//                 }
//             });

//             if (isValid) {
//                 currentStep++;
//                 showStep(currentStep);
//             }
//         });
//     });    

//     form.querySelectorAll(".prev").forEach(function(button) {
//         button.addEventListener("click", function() {

//             const currentFieldset = fieldsets[currentStep];

//             if (currentStep > 0) {
//                 currentStep--;
//                 showStep(currentStep);
//             } else {
//                 currentFieldset.querySelector('.prev').style.display = none;
//             }
//         });
//     });

//     function validarCPFeCNPJ(campo, campoMsgInvalid, campoMsgValid){
//         console.log(campo);
//         var documento = $(campo).val().replace(/[^\d]+/g,'');

//         // Verifica se o documento está vazio
//         if (documento == '') {
//             $(campoMsgInvalid).text('Por favor, insira um CPF ou CNPJ.');
//             documento.addClass('is-invalid');
//             return false;
//         }

//         // Verifica se o documento é um CPF válido
//         if (documento.length === 11) {
//             if (!validarCPF(documento)) {
//                 $(campoMsgInvalid).text('CPF inválido.');
//                 documento.removeClass('is-valid');
//                 documento.addClass('is-invalid');
//                 return false;
//             }else{
//                 $(campoMsgValid).text('CPF válido.');
//                 documento.removeClass('is-invalid');
//                 documento.addClass('is-valid');
//                 return true;
//             }
//         }
//         // Verifica se o documento é um CNPJ válido
//         else if (documento.length === 14) {
//             if (!validarCNPJ(documento)) {
//                 $(campoMsgInvalid).text('CNPJ inválido.');
//                 documento.addClass('is-invalid');
//                 documento.removeClass('is-valid');
//                 return false;
//             }else{
//                 $(campoMsgValid).text('CNPJ válido.');
//                 documento.removeClass('is-invalid');
//                 documento.addClass('is-valid');
//                 return true;
//             }
//         }
//         // Se o documento não tem 11 ou 14 dígitos, é inválido
//         else {
//             $(campoMsgInvalid).text('CPF ou CNPJ deve ter 11 ou 14 dígitos.');
//             documento.addClass('is-invalid');
//             return false;
//         }

//         // Se chegou até aqui, o documento é válido
//         documento.removeClass('is-invalid');
//         return true;
//     }

//     // Função para validar CPF
//     function validarCPF(cpf) {
//         cpf = cpf.replace(/[^\d]+/g,'');
//         if(cpf == '') return false;
//         // Elimina CPFs invalidos conhecidos
//         if (cpf.length != 11 ||
//             cpf == "00000000000" ||
//             cpf == "11111111111" ||
//             cpf == "22222222222" ||
//             cpf == "33333333333" ||
//             cpf == "44444444444" ||
//             cpf == "55555555555" ||
//             cpf == "66666666666" ||
//             cpf == "77777777777" ||
//             cpf == "88888888888" ||
//             cpf == "99999999999")
//                 return false;
//         // Valida 1o digito
//         let add = 0;
//         for (let i = 0; i < 9; i++)
//             add += parseInt(cpf.charAt(i)) * (10 - i);
//         let rev = 11 - (add % 11);
//         if (rev == 10 || rev == 11)
//             rev = 0;
//         if (rev != parseInt(cpf.charAt(9)))
//             return false;
//         // Valida 2o digito
//         add = 0;
//         for (let i = 0; i < 10; i++)
//             add += parseInt(cpf.charAt(i)) * (11 - i);
//         rev = 11 - (add % 11);
//         if (rev == 10 || rev == 11)
//             rev = 0;
//         if (rev != parseInt(cpf.charAt(10)))
//             return false;
//         return true;
//     }

//     // Função para validar CNPJ
//     function validarCNPJ(cnpj) {
//         cnpj = cnpj.replace(/[^\d]+/g,'');
//         if(cnpj == '') return false;

//         if (cnpj.length != 14) return false;

//         // Verifica se todos os dígitos são iguais
//         if (/^(\d)\1+$/.test(cnpj)) return false;

//         // Calcula o primeiro dígito verificador
//         var tamanho = cnpj.length - 2;
//         var numeros = cnpj.substring(0,tamanho);
//         var digitos = cnpj.substring(tamanho);
//         var soma = 0;
//         var pos = tamanho - 7;
//         for (var i = tamanho; i >= 1; i--) {
//             soma += numeros.charAt(tamanho - i) * pos--;
//             if (pos < 2) pos = 9;
//         }
//         var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//         if (resultado != digitos.charAt(0)) return false;

//         // Calcula o segundo dígito verificador
//         tamanho = tamanho + 1;
//         numeros = cnpj.substring(0,tamanho);
//         soma = 0;
//         pos = tamanho - 7;
//         for (var i = tamanho; i >= 1; i--) {
//             soma += numeros.charAt(tamanho - i) * pos--;
//             if (pos < 2) pos = 9;
//         }
//         resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//         if (resultado != digitos.charAt(1)) return false;

//         return true;
//     }
// });

$(document).ready(function() {
    const form = $(".form-wizard");
    const fieldsets = form.find(".fieldset");
    let currentStep = 0;

    $('.form-bolet-email').blur(function() {
        console.log($('#email').is(':empty') && $('#conf-email').is(':empty'));
        if ($('#conf-email').val()!== $('#email').val() || ($('#email').val()=='' && $('#conf-email').val()=='')){
            $('#conf-email').addClass('is-invalid').removeClass('is-valid');
            $('#email').addClass('is-invalid').removeClass('is-valid');
            if(!$('#email').val()=='' && $('#conf-email').val()==''){
                $("#invalidMsgConfEmail").text('Os e-mail são diferentes.');
                $("#invalidMsgEmail").text('Os e-mail são diferentes.');
            }
        } else {
            $('#conf-email').addClass('is-valid').removeClass('is-invalid');
            $('#email').addClass('is-valid').removeClass('is-invalid');
        }
    });

    showStep(currentStep);

    function showStep(step) {
        fieldsets.each(function(index, fieldset) {
            if (index === step) {
                $(fieldset).addClass("active");
            } else {
                $(fieldset).removeClass("active");
            }
        });

        if (step === fieldsets.length - 1) {
            // Último passo - alterar texto do botão para "Enviar"
            form.find(".next").hide();
            form.find(".prev").show();
            form.find("[type='submit']").show();
        } else if (step > 0 && step < fieldsets.length - 1) {
            form.find(".next").show();
            form.find(".prev").show();
            form.find("[type='submit']").hide();
        } else {
            form.find(".next").show();
            form.find(".prev").hide();
            form.find("[type='submit']").hide();
        }
    }

    form.on("submit", function(e) {
        e.preventDefault();
        // Aqui fica o código para enviar o formulário via AJAX
        // form.submit();
        alert("Formulário enviado!");
    });

    form.find(".next").on("click", function() {
        // Validação básica do formulário (pode ser melhorada conforme necessário)
        const currentFieldset = fieldsets.eq(currentStep);
        const inputs = currentFieldset.find("input, textarea, select");
        let isValid = true;
        inputs.each(function() {
            const input = $(this);
            emptyValInput = true
            input.val() == null || input.val().trim()=='' ? emptyValInput = true : emptyValInput = false;
            // console.log(valorInput.val())
            if (input.prop("required") && (emptyValInput || input.attr("id") === 'cpf_cnpj' || input.hasClass('is-invalid')) ) {
                if (input.attr("id") === 'cpf_cnpj') {
                    isValid = validarCPFeCNPJ('#cpf_cnpj', '#invalidDocumentoMsg', '#validDocumentoMsg');
                } else {
                    input.addClass('is-invalid').removeClass('is-valid');
                    isValid = false;
                }
            } else if (input.attr("id") !== "switch-pj" && !input.prop('disabled')) {
                input.addClass('is-valid').removeClass('is-invalid');
            }
        });

        if (isValid) {
            currentStep++;
            showStep(currentStep);
        }
    });

    form.find(".prev").on("click", function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    function validarCPFeCNPJ(campo, campoMsgInvalid, campoMsgValid){
        var documento = $(campo).val().replace(/[^\d]+/g,'');

        // Verifica se o documento está vazio
        if (documento == '') {
            $(campoMsgInvalid).text('Por favor, insira um CPF ou CNPJ.');
            $(campo).addClass('is-invalid');
            return false;
        }

        // Verifica se o documento é um CPF válido
        if (documento.length === 11) {
            if (!validarCPF(documento)) {
                $(campoMsgInvalid).text('CPF inválido.');
                $(campo).removeClass('is-valid');
                $(campo).addClass('is-invalid');
                return false;
            }else{
                $(campoMsgValid).text('CPF válido.');
                $(campo).removeClass('is-invalid');
                $(campo).addClass('is-valid');
                return true;
            }
        }
        // Verifica se o documento é um CNPJ válido
        else if (documento.length === 14) {
            if (!validarCNPJ(documento)) {
                $(campoMsgInvalid).text('CNPJ inválido.');
                $(campo).addClass('is-invalid');
                $(campo).removeClass('is-valid');
                return false;
            }else{
                $(campoMsgValid).text('CNPJ válido.');
                $(campo).removeClass('is-invalid');
                $(campo).addClass('is-valid');
                return true;
            }
        }
        // Se o documento não tem 11 ou 14 dígitos, é inválido
        else {
            $(campoMsgInvalid).text('CPF ou CNPJ deve ter 11 ou 14 dígitos.');
            $(campo).addClass('is-invalid');
            return false;
        }

        // Se chegou até aqui, o documento é válido
        documento.removeClass('is-invalid');
        return true;
    }

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
