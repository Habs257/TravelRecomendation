document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulaire soumis !');
});

async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        displayRecommendations(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des recommandations:', error);
    }
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.classList.add('recommendation');
        recElement.innerHTML = `
            <h3>${rec.name}</h3>
            <img src="${rec.imageUrl}" alt="${rec.name}">
            <p>${rec.description}</p>
        `;
        container.appendChild(recElement);
    });
}

document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const filteredResults = data.filter(item => {
                return item.name.toLowerCase().includes(searchInput) ||
                       (searchInput.includes('plage') && ['plage', 'plages'].includes(item.name.toLowerCase())) ||
                       (searchInput.includes('temple') && ['temple', 'temples'].includes(item.name.toLowerCase())) ||
                       (searchInput.includes('pays') && ['pays'].includes(item.name.toLowerCase()));
            });
            displayRecommendations(filteredResults);
        })
        .catch(error => console.error('Erreur de recherche:', error));
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendations').innerHTML = '';
});

fetchRecommendations();