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
    var randCountriesCarroussel = $("#carrousel-countries")
    randCardsCountry.empty();
    randCountriesCarroussel.empty();


    arrayCountries.forEach(country => {
        //for the display cards
        var cardCountry = `
                              <a class="country-card" href="detalhespais.html?cca3=${country.cca3}">
                                <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="country-flag">
                                <p class="country-name">${country.name.common}</p>
                              </a>
                            
                            `;
        randCardsCountry.append(cardCountry);

        //for the carrousel
        var itemCountry = `
                            <div class="carousel-item active">
                              <div class="row align-items-center" style="min-height: 400px;">
                                <div class="col-md-6 ps-5">
                                  <a href="detalhespais.html?cca3=${country.cca3}"><h1>${country.name.common}</h1></a>
                                  <p>
                                    Faz uma viagem pelos destinos mais deslumbrantes do mundo. Das ruas vibrantes de Nova Iorque às antigas ruinas de Roma,
                                    cada imagem revela um lugar à espera de ser explorado.
                                  </p>
                                  <br>
                                  <p>Quer seja para aventura, relaxante ou descoberta, encontra o teu proximo  destino conosco</p>
                                </div>
                                <div class="col-md-6 text-center">
                                  <img src="assets/img/pexels-ekrulila-3837494.jpg" class="img-fluid" alt="Globe">
                                </div>
                              </div>
                            </div>
                            `;
        randCountriesCarroussel.append(itemCountry);
    });
    
}