// script.js






async function findRestaurants() {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const apiKey = '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'; // Replace with your actual Groq API key

    const location = document.getElementById('location').value.trim();
    const kidsMenu = document.getElementById('kids-menu').checked;
    const rating = document.getElementById('rating').value;
    const budget = document.getElementById('budget').value;
    const foodTypes = Array.from(document.querySelectorAll('input[name="food-type"]:checked')).map(input => input.value);

    if (!location) {
        alert('Please enter a location');
        return;
    }

    const prompt = `Find restaurants in ${location} with a rating of ${rating} stars, ${
        kidsMenu ? 'with' : 'without'
    } a kids menu, and a budget level of ${budget}. ${foodTypes.length > 0 ? `Specializing in ${foodTypes.join(', ')} cuisine.` : 'No specific cuisine preference.'} Give me 4 restaurants THAT ARE NOT PERMANENTLY CLOSED don't write a long description and give me the city not full address and provide a yelp link and don't provide phone number or address or any other context. Make each restaurant a separate line, only provide the name and the city, give each restaurant a number before you say the name, and after you say the city put a yelp link. EXAMPLE Ivar's Acres of Clams - Seattle (Yelp)`;
    
    const requestData = {
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayResults(data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
        displayResults('Failed to fetch response. Please try again later.');
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const restaurants = results.split('\n\n').filter(line => line.trim() !== '').slice(0, 5);

    restaurants.forEach((restaurant, index) => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.classList.add('restaurant');

        // Handling cases where the response starts with a number followed by restaurant details
        const match = restaurant.match(/^(\d+\.)\s+(.+)/);
        if (match) {
            const restaurantDetails = match[2].trim(); // Extract restaurant details
            const yelpLinkMatch = restaurantDetails.match(/\(([^)]+)\)/); // Find Yelp link in parentheses

            if (yelpLinkMatch) {
                const yelpLink = yelpLinkMatch[1]; // Extract Yelp link
                const restaurantName = restaurantDetails.replace(yelpLinkMatch[0], '').trim(); // Remove Yelp link from restaurant name

                restaurantDiv.innerHTML = `
                    <h2>${match[1]}</h2>
                    <p>${restaurantName} (<a href="${yelpLink}" target="_blank">Yelp</a>)</p>
                `;
            } else {
                restaurantDiv.innerHTML = `
                    <h2>${match[1]}</h2>
                    <p>${restaurantDetails}</p>
                `;
            }
        } else {
            restaurantDiv.innerHTML = `
                <h2>Restaurant ${index + 1}</h2>
                <p>${restaurant}</p>
            `;
        }

        resultsDiv.appendChild(restaurantDiv);
    });
}





// Event listener for the find restaurants button
document.getElementById('find-restaurants-btn').addEventListener('click', findRestaurants);
