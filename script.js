function buscaCep(index) {
    var cep
    var estado
    var cidade
    var bairro
    var rua
    var verif

    if (index >= 0) {
        cep = document.getElementById(`cep${index}`).value.replace(/\D/g, '')
        estado = document.getElementById(`estado${index}`)
        cidade = document.getElementById(`cidade${index}`)
        bairro = document.getElementById(`bairro${index}`)
        rua = document.getElementById(`rua${index}`)
        verif = document.getElementById(`verif${index}`)
    } else {
        cep = document.getElementById('cep').value.replace(/\D/g, '')
        estado = document.getElementById('estado')
        cidade = document.getElementById('cidade')
        bairro = document.getElementById('bairro')
        rua = document.getElementById('rua')
        verif = document.getElementById('verif')
    }


    if (cep.length !== 8 || isNaN(cep)) {
        verif.innerHTML = '<div class="danger resposta">CEP inválido! Digite um CEP válido de 8 dígitos.</div>'
        return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(data => data.json()).then(conteudo => {
            if (conteudo.erro) {
                verif.innerHTML = '<div class="alert resposta">CEP não encontrado!</div>'
            } else {
                verif.innerHTML = ''
                estado.value = conteudo.uf
                cidade.value = conteudo.localidade
                bairro.value = conteudo.bairro
                rua.value = conteudo.logradouro
            }
        })
        .catch(error => {
            verif.innerHTML = '<div class="danger resposta">Erro ao buscar CEP!</div>'
        });
}

function cadastrar() {
    let cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        fone: document.getElementById('fone').value,
        cep: document.getElementById('cep').value.trim().replace(/\D/g, ''),
        estado: document.getElementById('estado').value,
        cidade: document.getElementById('cidade').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value
    };

    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    cadastros.push(cliente)

    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    var resposta;

    /*if (Object.values(cliente).some(valor => valor.trim() === '')) {
        alert("Preencha todos os campos!")
        return
    }*/


    if (cliente.nome === '' || cliente.email === '' || cliente.fone === '' || cliente.cep === '' || cliente.estado === '' || cliente.cidade === '' || cliente.bairro === '' || cliente.rua === '') {
        resposta = `
        <div class="alert resposta">
        Insira todos os dados.
        </div>`

    } else {
        resposta = `
        <h2>Dados Cadastrados</h2>
        <div class="success resposta">
            <p>Nome: ${cliente.nome}</p>
            <p>Email: ${cliente.email}</p>
            <p>Telefone: ${cliente.fone}</p>
            <p>CEP: ${cliente.cep}</p>
            <p>Estado: ${cliente.estado}</p>
            <p>Cidade: ${cliente.cidade}</p>
            <p>Bairro: ${cliente.bairro}</p>
            <p>Rua: ${cliente.rua}</p>
        </div>`
    }
    document.getElementById('dados').innerHTML = resposta
}
function formatarTelefone(input) {
    let numero = input.value.replace(/\D/g, "");

    if (numero.length > 10) {
        input.value = numero.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, "($1) $2$3-$4");
    } else {
        input.value = numero.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    }
}
function abrirCadastros() {
    let outputDados = document.getElementById('dados');
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    let resposta = ''
    cadastros.forEach((cliente, index) => {
        resposta += `
            <div class="tabela">
                <h3>Id #${index}</h3>
                <hr class="hr-card">
                <div class="col-2">
                    <div><input type="text" value="${cliente.nome}" id="nome${index}" disabled required placeholder="Nome"></div>
                    <div><input type="text" value="${cliente.email}" id="email${index}" disabled required placeholder="Email"></div>
                </div>
                <div class="col-2">
                    <div><input type="text" value="${cliente.fone}" id="telefone${index}" disabled required placeholder="Telefone"></div>
                    <div><input type="text" value="${cliente.cep}" id="cep${index}" onblur="buscaCep(${index})" maxlength="8"  disabled required placeholder="CEP"></div>
                    
                </div>
                <div class="col-2">
                    <div><input type="text" value="${cliente.estado}" id="estado${index}" disabled required placeholder="Estado"></div>
                    <div><input type="text" value="${cliente.cidade}" id="cidade${index}" disabled required placeholder="Cidade"></div>
                </div>
                <div class="col-2">
                    <div><input type="text" value="${cliente.bairro}" id="bairro${index}" disabled required placeholder="Bairro"></div>
                    <div><input type="text" value="${cliente.rua}" id="rua${index}" disabled required placeholder="Rua"></div>
                </div>
                <div class="mini-container"><div id="verif${index}"></div></div>
                
                <div class="col-2">
                    <button class="btn-salvar" onclick="salvarDados(${index})">Salvar</button>
                    <button class="btn-editar" onclick="editarDados(${index})">Editar</button>
                    <button class="btn-deletar" onclick="excluirDados(${index})">Excluir</button>
                </div>
            </div>`;
    });

    outputDados.innerHTML = resposta;
}

function salvarDados(index) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    cadastros[index] = {
        nome: document.getElementById(`nome${index}`).value,
        email: document.getElementById(`email${index}`).value,
        fone: document.getElementById(`telefone${index}`).value,
        cep: document.getElementById(`cep${index}`).value.trim().replace(/\D/g, ''),
        estado: document.getElementById(`estado${index}`).value,
        cidade: document.getElementById(`cidade${index}`).value,
        bairro: document.getElementById(`bairro${index}`).value,
        rua: document.getElementById(`rua${index}`).value
    };

    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    document.getElementById(`nome${index}`).setAttribute('disabled', true)
    document.getElementById(`email${index}`).setAttribute('disabled', true)
    document.getElementById(`telefone${index}`).setAttribute('disabled', true)
    document.getElementById(`cep${index}`).setAttribute('disabled', true)
    document.getElementById(`estado${index}`).setAttribute('disabled', true)
    document.getElementById(`cidade${index}`).setAttribute('disabled', true)
    document.getElementById(`bairro${index}`).setAttribute('disabled', true)
    document.getElementById(`rua${index}`).setAttribute('disabled', true)

}

function excluirDados(index) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    cadastros.splice(cadastros.indexOf(cadastros[index]), 1)
    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    abrirCadastros()
}

function editarDados(index) {
    document.getElementById(`nome${index}`).removeAttribute('disabled')
    document.getElementById(`email${index}`).removeAttribute('disabled')
    document.getElementById(`telefone${index}`).removeAttribute('disabled')
    document.getElementById(`cep${index}`).removeAttribute('disabled')
    document.getElementById(`estado${index}`).removeAttribute('disabled')
    document.getElementById(`cidade${index}`).removeAttribute('disabled')
    document.getElementById(`bairro${index}`).removeAttribute('disabled')
    document.getElementById(`rua${index}`).removeAttribute('disabled')
}