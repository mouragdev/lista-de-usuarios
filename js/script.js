const usuarios = document.getElementById("lista-usuarios");

fetch("https://crudcrud.com/api/ce3574e793ff4974b10c6af304912bc6/usuarios")
    .then(response => response.json())
    .then((listaDeUsuarios) => {
        listaDeUsuarios.forEach(usuario => {

            const card = document.createElement("li");
            card.className = "usuario"
            card.innerHTML = 
            `
                <div>
                    <span class="label">Nome:</span>
                    <strong>${usuario.nome}</strong>
                </div>

                <div>
                    <span class="label">E-mail:</span>
                    <strong>${usuario.email}</strong>
                </div>

                <button class="btn-excluir" type="button" onclick="removerUsuario('${usuario._id}', event)">
                    Excluir
                </button>
            `

            usuarios.appendChild(card);
        })
    })

document.getElementById("cadastra-usuario").addEventListener("click", () => {
    const novoNome = document.getElementById("nome").value;
    const novoEmail = document.getElementById("email").value;

    fetch("https://crudcrud.com/api/ce3574e793ff4974b10c6af304912bc6/usuarios", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nome: novoNome, email: novoEmail})
    })
    .then (response => response.json())
    .then ((usuario) => {
            const card = document.createElement("li");
            card.className = "usuario"
            card.innerHTML = 
            `
                <div>
                    <span class="label">Nome:</span>
                    <strong>${usuario.nome}</strong>
                </div>

                <div>
                    <span class="label">E-mail:</span>
                    <strong>${usuario.email}</strong>
                </div>

                <button class="btn-excluir" type="button" onclick="removerUsuario('${usuario._id}', event)">
                    Excluir
                </button>
            `

            usuarios.appendChild(card);
            document.getElementById("nome").value = ""
            document.getElementById("email").value = ""

    })

})

function removerUsuario(id, event) {
    fetch(`https://crudcrud.com/api/ce3574e793ff4974b10c6af304912bc6/usuarios/${id}`, {
        method: "DELETE"
    })

    const botaoClicado = event.target;
    const usuarioCorrespondente = botaoClicado.closest("li")
    usuarioCorrespondente.remove()
}

