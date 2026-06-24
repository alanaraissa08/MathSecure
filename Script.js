// ============================================
// 1. LISTA DE OBJETOS
// ============================================

// Lista de dicas de segurança (array de objetos)
const dicasSeguranca = [
    { id: 1, titulo: 'Comprimento Mínimo', descricao: 'Use pelo menos 12 caracteres', importante: true },
    { id: 2, titulo: 'Variedade', descricao: 'Misture maiúsculas, minúsculas, números e símbolos', importante: true },
    { id: 3, titulo: 'Evite Palavras', descricao: 'Não use palavras do dicionário ou nomes', importante: true },
    { id: 4, titulo: 'Frases', descricao: 'Use frases com substituições (ex: "M@1s3gur4")', importante: false },
    { id: 5, titulo: 'Autenticação 2FA', descricao: 'Ative verificação em duas etapas', importante: true },
    { id: 6, titulo: 'Senhas Únicas', descricao: 'Use senhas diferentes para cada serviço', importante: true },
    { id: 7, titulo: 'Gerenciadores', descricao: 'Use gerenciadores de senhas confiáveis', importante: false },
    { id: 8, titulo: 'Troca Periódica', descricao: 'Troque senhas importantes a cada 6 meses', importante: false }
];

// Lista de insights sobre IA
const insightsPreDefinidos = [
    '🔍 IA analisa milhões de senhas vazadas para identificar padrões',
    '🧠 Redes neurais detectam senhas fracas em milissegundos',
    '📊 Machine learning prevê ataques antes de acontecerem',
    '🤖 IA gera senhas mais aleatórias que qualquer humano',
    '🛡️ Sistemas com IA bloqueiam 99.9% de tentativas de invasão',
    '🎯 Deep learning identifica phishing com precisão cirúrgica',
    '🔐 IA auxilia na criação de senhas fortes e memoráveis',
    '📈 Algoritmos evoluem constantemente contra novas ameaças'
];

// Histórico de análises
let historicoAnalises = [];

// Contador de insights
let contadorInsights = 0;

// ============================================
// 2. FUNÇÕES PARA DIVIDIR PROBLEMAS
// ============================================

// Função principal: Analisar senha
function analisarSenha() {
    const senha = document.getElementById('senhaInput').value;
    
    // Sub-funções (cada uma resolve um problema específico)
    const comprimento = calcularComprimento(senha);
    const alfabeto = calcularAlfabeto(senha);
    const combinacoes = calcularCombinacoes(alfabeto, comprimento);
    const tempo = calcularTempo(combinacoes);
    const forca = avaliarForca(comprimento, alfabeto);
    
    // Atualizar UI
    atualizarResultados(comprimento, alfabeto, combinacoes, tempo, forca);
    atualizarDetalhesMatematicos(senha, comprimento, alfabeto, combinacoes);
    
    // Adicionar ao histórico (se tiver conteúdo)
    if (senha.length > 0) {
        adicionarHistorico(senha, forca.nivel);
    }
}

// Sub-função: Calcular comprimento
function calcularComprimento(senha) {
    return senha.length;
}

// Sub-função: Calcular alfabeto usado
function calcularAlfabeto(senha) {
    let alfabeto = 0;
    if (/[a-z]/.test(senha)) alfabeto += 26;
    if (/[A-Z]/.test(senha)) alfabeto += 26;
    if (/[0-9]/.test(senha)) alfabeto += 10;
    if (/[^a-zA-Z0-9]/.test(senha)) alfabeto += 33;
    return alfabeto;
}

// Sub-função: Calcular combinações
function calcularCombinacoes(alfabeto, comprimento) {
    if (comprimento === 0 || alfabeto === 0) return 0;
    return Math.pow(alfabeto, comprimento);
}

// Sub-função: Calcular tempo para quebrar
function calcularTempo(combinacoes) {
    const tentativasPorSegundo = 1000000000; // 1 bilhão
    return combinacoes / tentativasPorSegundo;
}

// Sub-função: Formatar tempo
function formatarTempo(segundos) {
    if (segundos === 0) return '0s';
    if (segundos < 60) return `${Math.round(segundos)}s`;
    if (segundos < 3600) return `${Math.round(segundos/60)}min`;
    if (segundos < 86400) return `${Math.round(segundos/3600)}h`;
    if (segundos < 31536000) return `${Math.round(segundos/86400)}d`;
    return `${(segundos/31536000).toFixed(1)} anos`;
}

// Sub-função: Avaliar força da senha
function avaliarForca(comprimento, alfabeto) {
    let nivel, cor, percentual;
    
    if (comprimento >= 14 && alfabeto >= 70) {
        nivel = 'Forte';
        cor = '#51cf66';
        percentual = 95;
    } else if (comprimento >= 12 && alfabeto >= 60) {
        nivel = 'Forte';
        cor = '#51cf66';
        percentual = 80;
    } else if (comprimento >= 10 && alfabeto >= 52) {
        nivel = 'Média';
        cor = '#fcc419';
        percentual = 60;
    } else if (comprimento >= 8 && alfabeto >= 36) {
        nivel = 'Média';
        cor = '#fcc419';
        percentual = 45;
    } else if (comprimento >= 6) {
        nivel = 'Fraca';
        cor = '#ff6b6b';
        percentual = 25;
    } else {
        nivel = 'Fraca';
        cor = '#ff6b6b';
        percentual = 10;
    }
    
    return { nivel, cor, percentual };
}

// ============================================
// 3. MANIPULAÇÃO DO DOM
// ============================================

// Atualizar resultados na tela
function atualizarResultados(comprimento, alfabeto, combinacoes, tempo, forca) {
    document.getElementById('comprimentoValor').textContent = comprimento;
    document.getElementById('alfabetoValor').textContent = alfabeto;
    document.getElementById('combinacoesValor').textContent = formatarCombinacoes(combinacoes);
    document.getElementById('tempoValor').textContent = formatarTempo(tempo);
    document.getElementById('nivelForca').textContent = forca.nivel;
    document.getElementById('nivelForca').style.color = forca.cor;
    
    const barra = document.getElementById('barraNivel');
    barra.style.width = forca.percentual + '%';
    barra.style.background = forca.cor;
    
    // Mostrar detalhes matemáticos
    const detalhesDiv = document.getElementById('detalhesMatematicos');
    if (comprimento > 0) {
        detalhesDiv.style.display = 'block';
        document.getElementById('detalhesTexto').innerHTML = `
            <strong>Fórmula:</strong> N = C<sup>L</sup><br>
            <strong>Cálculo:</strong> ${alfabeto}<sup>${comprimento}</sup> = ${formatarCombinacoes(combinacoes)} combinações<br>
            <strong>Interpretação:</strong> Uma senha com ${comprimento} caracteres usando ${alfabeto} caracteres possíveis tem ${formatarCombinacoes(combinacoes)} combinações.
        `;
    } else {
        detalhesDiv.style.display = 'none';
    }
}

// Formatar combinações em notação científica
function formatarCombinacoes(valor) {
    if (valor === 0) return '0';
    if (valor < 1000) return valor.toString();
    const exp = Math.floor(Math.log10(valor));
    const mantissa = valor / Math.pow(10, exp);
    return mantissa.toFixed(2) + '×10^' + exp;
}

// Adicionar ao histórico
function adicionarHistorico(senha, nivel) {
    const analise = {
        id: Date.now(),
        senha: senha,
        nivel: nivel,
        data: new Date().toLocaleString()
    };
    
    historicoAnalises.push(analise);
    
    // Limitar a 10 itens
    if (historicoAnalises.length > 10) {
        historicoAnalises.shift();
    }
    
    renderizarHistorico();
    atualizarStatsHistorico();
}

// Renderizar histórico
function renderizarHistorico() {
    const lista = document.getElementById('listaHistorico');
    lista.innerHTML = '';
    
    // Usando forEach para iterar
    historicoAnalises.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>🔑 ${item.senha}</span>
            <span>
                <span class="historico-forca forca-${item.nivel}">${item.nivel}</span>
                <span style="opacity:0.5;margin-left:10px;font-size:0.8rem;">${item.data}</span>
            </span>
        `;
        lista.appendChild(li);
    });
}

// Atualizar estatísticas do histórico
function atualizarStatsHistorico() {
    document.getElementById('totalAnalises').textContent = historicoAnalises.length;
}

// Limpar histórico
function limparHistorico() {
    historicoAnalises = [];
    renderizarHistorico();
    atualizarStatsHistorico();
}

// ============================================
// 4. COMPARADOR DE SENHAS
// ============================================

function compararSenhas() {
    const senha1 = document.getElementById('senha1').value;
    const senha2 = document.getElementById('senha2').value;
    
    if (!senha1 || !senha2) {
        document.getElementById('comparacaoResultado').textContent = 'Digite duas senhas para comparar';
        return;
    }
    
    const forca1 = avaliarForca(senha1.length, calcularAlfabeto(senha1));
    const forca2 = avaliarForca(senha2.length, calcularAlfabeto(senha2));
    
    document.getElementById('resultado1').innerHTML = `
        <strong>${forca1.nivel}</strong> (${forca1.percentual}%)
    `;
    document.getElementById('resultado1').style.color = forca1.cor;
    
    document.getElementById('resultado2').innerHTML = `
        <strong>${forca2.nivel}</strong> (${forca2.percentual}%)
    `;
    document.getElementById('resultado2').style.color = forca2.cor;
    
    const comparacao = document.getElementById('comparacaoResultado');
    if (forca1.percentual > forca2.percentual) {
        comparacao.innerHTML = '🏆 Senha 1 é mais forte!';
        comparacao.style.color = '#51cf66';
    } else if (forca2.percentual > forca1.percentual) {
        comparacao.innerHTML = '🏆 Senha 2 é mais forte!';
        comparacao.style.color = '#51cf66';
    } else {
        comparacao.innerHTML = '⚖️ As duas senhas têm a mesma força';
        comparacao.style.color = '#fcc419';
    }
}

// ============================================
// 5. GERADOR DE SENHA FORTE
// ============================================

function gerarSenhaForte() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=';
    const tamanho = 16;
    let senha = '';
    
    // Garantir pelo menos um de cada tipo
    senha += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    senha += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    senha += '0123456789'[Math.floor(Math.random() * 10)];
    senha += '!@#$%^&*()_-+='[Math.floor(Math.random() * 16)];
    
    // Completar o resto
    for (let i = 4; i < tamanho; i++) {
        senha += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    
    // Embaralhar
    senha = senha.split('').sort(() => Math.random() - 0.5).join('');
    
    document.getElementById('senhaInput').value = senha;
    analisarSenha();
}

// ============================================
// 6. INTELIGÊNCIA ARTIFICIAL (Reflexão)
// ============================================

// Gerar insight sobre IA
function gerarInsightIA() {
    const indice = Math.floor(Math.random() * insightsPreDefinidos.length);
    const insight = insightsPreDefinidos[indice];
    
    const lista = document.getElementById('listaInsights');
    const li = document.createElement('li');
    li.textContent = insight;
    lista.appendChild(li);
    
    contadorInsights++;
    document.getElementById('contadorInsights').textContent = contadorInsights;
    
    // Scroll para o último insight
    li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Análise inteligente com IA
function analiseInteligente() {
    if (historicoAnalises.length === 0) {
        document.getElementById('analiseIA').textContent = '⚠️ Analise algumas senhas primeiro!';
        return;
    }
    
    const fortes = historicoAnalises.filter(h => h.nivel === 'Forte').length;
    const medias = historicoAnalises.filter(h => h.nivel === 'Média').length;
    const fracas = historicoAnalises.filter(h => h.nivel === 'Fraca').length;
    
    const total = historicoAnalises.length;
    const porcentagemForte = Math.round((fortes / total) * 100);
    
    let recomendacao = '';
    if (porcentagemForte >= 80) {
        recomendacao = '✅ Excelente! Suas senhas são muito seguras. Continue assim!';
    } else if (porcentagemForte >= 50) {
        recomendacao = '⚠️ Bom, mas você pode melhorar. Tente usar senhas mais longas.';
    } else {
        recomendacao = '🔴 Atenção! Muitas senhas fracas. Use o gerador automático.';
    }
    
    document.getElementById('analiseIA').innerHTML = `
        🔍 Análise concluída:<br>
        🟢 Fortes: ${fortes} (${porcentagemForte}%)<br>
        🟡 Médias: ${medias}<br>
        🔴 Fracas: ${fracas}<br>
        <strong style="color:#00d4ff;">${recomendacao}</strong>
    `;
    
    document.getElementById('recomendacoesIA').textContent = 
        porcentagemForte >= 80 ? 'Ótima' : 
        porcentagemForte >= 50 ? 'Melhorar' : 'Urgente';
}

// ============================================
// 7. INICIALIZAÇÃO
// ============================================

function inicializarSite() {
    // Renderizar dicas
    const container = document.getElementById('listaDicas');
    dicasSeguranca.forEach(dica => {
        const div = document.createElement('div');
        div.className = 'dica-item';
        div.innerHTML = `
            <strong>${dica.titulo}</strong><br>
            <span style="opacity:0.7;font-size:0.9rem;">${dica.descricao}</span>
            ${dica.importante ? ' ⭐' : ''}
        `;
        container.appendChild(div);
    });
    
    // Gerar insights iniciais
    for (let i = 0; i < 3; i++) {
