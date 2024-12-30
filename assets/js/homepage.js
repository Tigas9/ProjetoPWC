var api_url = "https://restcountries.com/v3.1/";

//Ao carregar pagina
$(document).ready(function() {
    $.ajax({
        url: api_url +"all",
        method: "GET",
        success: function(data ){
                //console.log(data);
                getRandomCountries(data);
        },
        error: function(){
            alert("Erro ao encontrar países");
        }
    })
})

function getRandomCountries(arrayCountries) {
    var randomCountries = [];
    while (randomCountries.length < 3) {

        var randIndex = Math.floor(Math.random() * arrayCountries.length)
        var country = arrayCountries[randIndex];

        if (!randomCountries.includes(country)) {
            randomCountries.push(country);
        }
    }

    displayCountries(randomCountries)
    //console.log(randomCountries);
}

function displayCountries(arrayCountries) {
    var randCardsCountry = $("#random-countries");
    randCardsCountry.empty();

    arrayCountries.forEach(country => {
        var cardCountry = `
                              <a class="country-card" href="detalhespais.html?cca3=${country.cca3}">
                                <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="country-flag">
                                <p class="country-name">${country.name.common}</p>
                              </a>
                            
                            `;
        randCardsCountry.append(cardCountry);
    });
    
}