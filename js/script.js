/*****************************************************************************************
 * Objetivo: criar um Web site que consome dados de uma API referente ao mundo de desenhos em quadrinhos
 * Data: 09/11/2026
 * Autor: Matheus Silva
 * Versao: 1.0
 *****************************************************************************************/
const API_URL = 'https://rickandmortyapi.com/api/character';
const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');

let charactersData = [];

// Função responsável por consumir os dados da API
async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        charactersData = data.results;
        renderCards(charactersData);
    } catch (error) {
        cardsContainer.innerHTML = '<p>Erro ao carregar dados da API.</p>';
        console.error('Erro na requisição:', error);
    }
}

// Função para traduzir os nomes de origem mais comuns
function formatOrigin(originName) {
    if (!originName || originName.toLowerCase() === 'unknown') {
        return 'Desconhecida';
    }
    
    return originName
        .replace(/Earth/g, 'Terra')
        .replace(/Replacement Dimension/g, 'Dimensão de Substituição')
        .replace(/Post-Apocalyptic Dimension/g, 'Dimensão Pós-Apocalíptica');
}

// Função responsável por criar dinamicamente os elementos no DOM
function renderCards(characters) {
    // Limpa o conteúdo do container
    cardsContainer.innerHTML = '';

    if (characters.length === 0) {
        cardsContainer.innerHTML = '<p>Nenhum personagem encontrado.</p>';
        return;
    }

    characters.forEach(character => {
        // Criando elemento article dinamicamente
        const card = document.createElement('article');
        card.classList.add('card');

        // Determinando cor da bolinha de status
        let statusClass = 'status-unknown';
        if (character.status.toLowerCase() === 'alive') statusClass = 'status-alive';
        if (character.status.toLowerCase() === 'dead') statusClass = 'status-dead';

        // Tradução do Status
        let statusPT = 'Desconhecido';
        if (character.status.toLowerCase() === 'alive') statusPT = 'Vivo';
        if (character.status.toLowerCase() === 'dead') statusPT = 'Morto';

        // Tradução das Espécies mais comuns
        let speciesPT = character.species;
        if (character.species.toLowerCase() === 'human') speciesPT = 'Humano';
        if (character.species.toLowerCase() === 'alien') speciesPT = 'Alien';
        if (character.species.toLowerCase() === 'humanoid') speciesPT = 'Humanóide';
        if (character.species.toLowerCase() === 'poopybutthole') speciesPT = 'Poopybutthole';
        if (character.species.toLowerCase() === 'mythological creature') speciesPT = 'Criatura Mitológica';
        if (character.species.toLowerCase() === 'animal') speciesPT = 'Animal';
        if (character.species.toLowerCase() === 'robot') speciesPT = 'Robô';
        if (character.species.toLowerCase() === 'cronenberg') speciesPT = 'Cronenberg';
        if (character.species.toLowerCase() === 'disease') speciesPT = 'Doença';

        // Tradução da Origem
        const originName = formatOrigin(character.origin.name);

        // Injetando estrutura interna do card com os textos traduzidos
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-info">
                <h3>${character.name}</h3>
                <div class="status">
                    <span class="status-dot ${statusClass}"></span>
                    <span>${statusPT} - ${speciesPT}</span>
                </div>
                <p><strong>Origem:</strong> ${originName}</p>
            </div>
        `;

        // Anexando o card criado dentro da div pai no HTML
        cardsContainer.appendChild(card);
    });
}

// Evento de busca/filtro em tempo real
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCharacters = charactersData.filter(char =>
        char.name.toLowerCase().includes(searchTerm)
    );
    renderCards(filteredCharacters);
});

// Inicializar a busca ao carregar a página
fetchCharacters();