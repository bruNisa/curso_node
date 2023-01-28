// é carregado após o término do carregamento de todos os outros arquivos
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){
        evento.preventDefault(); // evita comportamento padrão que recarrega a página sempre que o form é submetido
        let numeroMaximo = parseInt(document.getElementById('numero-maximo').value);
        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1);
        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = 'block';
    })
})