function searchTravel() {
    const input = document.getElementById('recommendationInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let foundResults = [];

            // 🔹 Search in Countries & Cities
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(input) || country.name.toLowerCase().includes(input)) {
                        foundResults.push({
                            name: city.name,
                            imageUrl: city.imageUrl,
                            description: city.description
                        });
                    }
                });
            });

            // 🔹 Search in Beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(input) || input.includes('beach')) {
                    foundResults.push({
                        name: beach.name,
                        imageUrl: beach.imageUrl,
                        description: beach.description
                    });
                }
            });

            // 🔹 Search in Temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(input) || input.includes('temple')) {
                    foundResults.push({
                        name: temple.name,
                        imageUrl: temple.imageUrl,
                        description: temple.description
                    });
                }
            });

            // ✅ Display Results
            if (foundResults.length > 0) {
                foundResults.forEach(item => {
                    resultDiv.innerHTML += `
                        <div class="result-item">
                            <h2>${item.name}</h2>
                            <img src="${item.imageUrl}" alt="${item.name}" style="width: 300px; height: auto;">
                            <p>${item.description}</p>
                        </div>
                    `;
                });
            } else {
                resultDiv.innerHTML = '<p style="color: red;">No matching results found. Try another keyword!</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p style="color: red;">An error occurred while fetching data.</p>';
        });
}

//  Add event listener to Search button
document.getElementById('btnSearch').addEventListener('click', searchTravel);
