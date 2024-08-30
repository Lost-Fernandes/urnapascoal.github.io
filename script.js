const qS = (el)=>document.querySelector(el);
let seuVotoPara = qS('.d-1-1 span');
let cargo = qS('.d-1-2');
let desc = qS('.d-1-4');
let lateral = qS('.d-1-right');
let aviso = qS('.d-2');
let quadrado = qS('.d-1-3');
let etapaAtual = 0;
let numeroD = '';
let votoBranco = false;
let votos = [];


function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    numeroD = '';
    votoBranco = false;
    let numeroHTML = '';
    for(let i = 0; i < etapa.numeros; i++) {
       if(i === 0) {
           numeroHTML += '<div class="quadrado pisca"></div>'
       }else {
           numeroHTML += '<div class="quadrado"></div>'
       }
        
    }
    seuVotoPara.style.display = 'none';
    desc.innerHTML = '';
    lateral.innerHTML = '';
    aviso.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    quadrado.innerHTML = numeroHTML;
}

function clicou(n){
    let elNumero = qS('.quadrado.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n
        elNumero.classList.remove('pisca');
        playKey();
        numeroD = `${numeroD}${n}`;
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }else {
            atualizaInterface();
        }
        
    }

}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numeroD){
            return true
        }else {
            return false
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        desc.innerHTML = `Nome: ${candidato.nome}<br/>Partido ${candidato.partido}`;
        aviso.style.display = 'block';
        let fotosC = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                desc.innerHTML = `Nome: ${candidato.nome}<br/> Vice: ${candidato.vice}<br/> Partido: ${candidato.partido}`;
                fotosC += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosC += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosC;
    }else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = '<div class="aviso--grande pisca">Voto Nulo</div>';
    }
    
}

function branco(){
    votoBranco = true;
    if(numeroD === ''){
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        quadrado.innerHTML = '';
        desc.innerHTML = '<div class="aviso--grande pisca">SEU VOTO EM BRANCO</div>';
    }else {
        alert('Para votar em BRANCO, limpe o campo!')
    }
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            Etapa: etapa.titulo,
            Voto: branco
        });
    }else if(numeroD.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            Etapa: etapa.titulo,
            Voto: numeroD
        });
    }
    if(votoConfirmado){
        playConfirm();
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else {
            qS('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
    
}
comecarEtapa();

qS('button').addEventListener('click',()=>{
    if(qS('.candidatos--painel').style.display == 'none'){
        qS('.candidatos--painel').style.display = 'flex'
    }else {
        qS('.candidatos--painel').style.display = 'none'
    } 
});

function playConfirm(){
    let audioElement = qS('.csound');
    audioElement.play();
}

function playKey(){
    let audioElement = qS('.ksound');
    audioElement.currentTime = 0;
    audioElement.play();
}