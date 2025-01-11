// Preechimento automatico dos campos classe financeira e categoria
document.getElementById('subCategoria').addEventListener('change', function () {
    const subCategoria = this.value;
    const categoriaField = document.getElementById('categoria');
    const classeFinanceiraField = document.getElementById('classeFinanceira');

    // Explicit mapping logic for each subCategoria
    if (subCategoria === "Automovel") {
        categoriaField.value = "Aquisição de ativos";
        classeFinanceiraField.value = "Aquisição de Activos";
    } else if (subCategoria === "Prestação Serviços") {
        categoriaField.value = "Prestador de serviço";
        classeFinanceiraField.value = "Prestação Serviços";
    } else if (subCategoria === "Formação") {
        categoriaField.value = "Cursos e formações";
        classeFinanceiraField.value = "Despesa Var";
    } else if (subCategoria === "Consultoria") {
        categoriaField.value = "Consultoria";
        classeFinanceiraField.value = "Consultoria";
    } else if (subCategoria === "Software e Ordem") {
        categoriaField.value = "Licenças";
        classeFinanceiraField.value = "Despesa Fixa";
    } else if (subCategoria === "Vencimentos") {
        categoriaField.value = "Vencimentos";
        classeFinanceiraField.value = "Despesa Fixa";
    } else if (subCategoria === "Via verde") {
        categoriaField.value = "Transportes";
        classeFinanceiraField.value = "Despesa Var";
    } else if (subCategoria === "Papelaria / Gráfica") {
        categoriaField.value = "Papelaria e comunicações";
        classeFinanceiraField.value = "Despesa Fixa";
    } else if (subCategoria === "Telefone e Internet") {
        categoriaField.value = "Papelaria e comunicações";
        classeFinanceiraField.value = "Despesa Fixa";
    } else if (subCategoria === "Softwares e Ordem") {
        categoriaField.value = "Licenças";
        classeFinanceiraField.value = "Despesa Fixa";
    } else if (subCategoria === "Transportes") {
        categoriaField.value = "Transportes";
        classeFinanceiraField.value = "Despesa Var";
    } else if (subCategoria === "IVA") {
        categoriaField.value = "Impostos";
        classeFinanceiraField.value = "Taxas e Impostos";
    } else if (subCategoria === "Segurança Social") {
        categoriaField.value = "Impostos";
        classeFinanceiraField.value = "Taxas e Impostos";
    } else if (subCategoria === "Contabilidade") {
        categoriaField.value = "Contabilidade";
        classeFinanceiraField.value = "Despesa Fixa";
    } else if (subCategoria === "IRC") {
        categoriaField.value = "Impostos";
        classeFinanceiraField.value = "Taxas e Impostos";
    } else if (subCategoria === "Combustivel") {
        categoriaField.value = "Transportes";
        classeFinanceiraField.value = "Despesa Var";
    } else if (subCategoria === "Fotografia e Video") {
        categoriaField.value = "Produção de conteúdo";
        classeFinanceiraField.value = "Marketing";
    } else if (subCategoria === "Gestor de trafego") {
        categoriaField.value = "Tráfego pago";
        classeFinanceiraField.value = "Marketing";
    } else if (subCategoria === "Wordpress") {
        categoriaField.value = "Taxas";
        classeFinanceiraField.value = "Taxas e Impostos";
    } else if (subCategoria === "Seguros") {
        categoriaField.value = "Seguros";
        classeFinanceiraField.value = "Taxas e Impostos";
    } else if (subCategoria === "Meta") {
        categoriaField.value = "Tráfego pago";
        classeFinanceiraField.value = "Marketing";
    } else if (subCategoria === "Google") {
        categoriaField.value = "Tráfego pago";
        classeFinanceiraField.value = "Marketing";
    } else if (subCategoria === "Tiktok") {
        categoriaField.value = "Tráfego pago";
        classeFinanceiraField.value = "Marketing";
    } else if (subCategoria === "Podcast") {
        categoriaField.value = "Produção de conteúdo";
        classeFinanceiraField.value = "Marketing";
    } else if (subCategoria === "Formações/workshops") {
        categoriaField.value = "Eventos";
        classeFinanceiraField.value = "Eventos";
    } else if (subCategoria === "Restaurantes/compras") {
        categoriaField.value = "Alimentação";
        classeFinanceiraField.value = "Despesa Var";
    } else if (subCategoria === "Outras Despesas") {
        categoriaField.value = "Outras despesas";
        classeFinanceiraField.value = "Despesa Var";
    } else if (subCategoria === "SAL") {
        categoriaField.value = "Infoproduto";
        classeFinanceiraField.value = "Infoprodutos";
    } else if (subCategoria === "MARÉ") {
        categoriaField.value = "Infoproduto";
        classeFinanceiraField.value = "Infoprodutos";
    } else if (subCategoria === "COSTA") {
        categoriaField.value = "Infoproduto";
        classeFinanceiraField.value = "Infoprodutos";
    } else if (subCategoria === "DUNA") {
        categoriaField.value = "Infoproduto";
        classeFinanceiraField.value = "Infoprodutos";
    } else if (subCategoria === "CRU") {
        categoriaField.value = "Infoproduto";
        classeFinanceiraField.value = "Infoprodutos";
    } else if (subCategoria === "Consultas online") {
        categoriaField.value = "Consultas";
        classeFinanceiraField.value = "Consultas";
    } else if (subCategoria === "Consultas Ousia") {
        categoriaField.value = "Consultas";
        classeFinanceiraField.value = "Consultas";
    } else if (subCategoria === "Consultas ING") {
        categoriaField.value = "Consultas";
        classeFinanceiraField.value = "Consultas";
    } else if (subCategoria === "Campanhas Marcas/Empresas") {
        categoriaField.value = "Produção de conteúdo";
        classeFinanceiraField.value = "Marketing";
    } else {
        categoriaField.value = ""; // Clear Categoria if no match
        classeFinanceiraField.value = ""; // Clear Classe Financeira if no match
    }
});

// Submit
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
    if (!data.value ) {
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
    if (!observacoes.value) {
        isValid = false;
        document.getElementById('observacoesError').textContent = 'Por favor, insira pelo menos 1 caractere.';
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
                // alert('Formulário enviado com sucesso!');
                console.log('Dados recebidos pelo servidor:', result.received_data);
                // Redirect to the form page using the redirect_url from the response (This effectively redirects the user to the new URL.)
                window.location.href = result.redirect_url;
            } else {
                alert('Falha ao enviar o formulário. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    }
});

