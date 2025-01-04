// document.getElementById('modernForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Clear all error messages
//     document.querySelectorAll('.error').forEach(error => error.textContent = '');

//     let isValid = true;

//     // Validate Valor
//     const valor = document.getElementById('valor');
//     if (!valor.value || valor.value <= 0) {
//         isValid = false;
//         document.getElementById('valorError').textContent = 'Por favor, insira um valor válido.';
//     }

//     //Data
//     const today = new Date().toISOString().split('T')[0];
//     document.getElementById('data').value = today;

//     // Validate Tipo
//     const tipo = document.getElementById('tipo');
//     if (!tipo.value) {
//         isValid = false;
//         document.getElementById('tipoError').textContent = 'Por favor, selecione um tipo.';
//     }

//     // Validate Sub Categoria
//     const subCategoria = document.getElementById('subCategoria');
//     if (!subCategoria.value) {
//         isValid = false;
//         document.getElementById('subCategoriaError').textContent = 'Por favor, selecione uma sub categoria.';
//     }

//     // Validate Observações
//     const observacoes = document.getElementById('observacoes');
//     document.getElementById('observacoesError').textContent = 'Por favor, insira ao menos 100 caracteres.';

//     if (isValid) {
//         alert('Formulário enviado com sucesso!');
//         // Form submit logic here
//     }
// });

document.getElementById('modernForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Form submission intercepted.");

    // Clear all error messages
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    let isValid = true;

    // Validate Valor
    const valor = document.getElementById('valor');
    if (!valor.value || valor.value <= 0) {
        isValid = false;
        document.getElementById('valorError').textContent = 'Por favor, insira um valor válido.';
    }

    // Validate Data
    const data = document.getElementById('data');
    const today = new Date().toISOString().split('T')[0];
    if (!data.value || data.value > today) {
        isValid = false;
        document.getElementById('dataError').textContent = 'Por favor, insira uma data válida.';
    }

    // Validate Tipo
    const tipo = document.getElementById('tipo');
    if (!tipo.value) {
        isValid = false;
        document.getElementById('tipoError').textContent = 'Por favor, selecione um tipo.';
    }

    // Validate Sub Categoria
    const subCategoria = document.getElementById('subCategoria');
    if (!subCategoria.value) {
        isValid = false;
        document.getElementById('subCategoriaError').textContent = 'Por favor, selecione uma sub categoria.';
    }

    // Validate Observações
    const observacoes = document.getElementById('observacoes');
    if (!observacoes.value || observacoes.value.length < 100) {
        isValid = false;
        document.getElementById('observacoesError').textContent = 'Por favor, insira ao menos 100 caracteres.';
    }

    if (isValid) {
        // Prepare form data for submission
        const formData = new FormData(document.getElementById('modernForm'));

        try {
            const response = await fetch('/submit-form', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Formulário enviado com sucesso!');
                console.log('Dados recebidos pelo servidor:', result.received_data);
            } else {
                alert('Falha ao enviar o formulário. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    }
});
