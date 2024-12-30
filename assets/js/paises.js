var api_url = "https://restcountries.com/v3.1/";


//AO carregar a pagina
$(document).ready(function(){
    fetchCountries();
    $("#button-pesquisar").on("click", function(){
        var inputText = $("#nomepais").val().trim();

        if(inputText == "") {
            fetchCountries();
        }
        else {
            fetchCountry(inputText).toLowerCase();
        }
    })
});
function fetchCountries(){
    $.ajax({
        url: api_url + "all",
        method: "GET",
        success: function(data){
            displayCountries(data);
        },
        error: function(){
            alert("Erro ao encontrar paises");
        }
    })
}


function fetchCountry(inputText){
    $.ajax({
        url: api_url + "name/" + inputText,
        method: "GET",
        success: function(data){
            displayCountry(data);
        },
        error: function(){
            alert("Pais não encontrado");
        }
    });
}

function displayCountry(arrayCountry){
    var listaCountry = $("#lista-paises");
    listaCountry.empty();

    arrayCountry.forEach(country => {
        var countryCard = `     <div class="card">
                                  <div class="card shadow-sm">
                                    <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="card-img-top" style="height: 150px; object-fit: cover;">
                                      <div class="card-body">
                                        <p class="card-text">${country.name.common}</p>
                                        <p class="card-text"Nome Offical do Pais>${country.name.official}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                          <div class="btn-group">
                                            <p><a href="detalhespais.html?cca3=${country.cca3}" class="btn btn-primary btn-sm">Ver Detalhes</a></p>
                                          </div>
                                        </div>
                                      </div>    
                                  </div>
                                </div>`;
        listaCountry.append(countryCard);
    });
}

function displayCountries(arrayCountries){
    var listaCountries = $("#lista-paises");
    listaCountries.empty();

    arrayCountries.forEach(country => {
        var countryCard = `<div class="card">
                            <div class="card shadow-sm">
                                <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="card-img-top" style="height: 150px; object-fit: cover;">
                                <div class="card-body">
                                    <p class="card-text">${country.name.common}</p>
                                    <p class="card-text"Nome Offical do Pais>${country.name.official}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <p><a href="detalhespais.html?cca3=${country.cca3}" class="btn btn-primary btn-sm">Ver Detalhes</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           </div> `;
        listaCountries.append(countryCard);
    });

    $(".toggle-favorito").on("click", function () {
        var countryCode = $(this).data("country-code");
        toggleFavorito(countryCode);
        fetchCountries(); //Atualiza a lista de países após a alteração da lista de favoritos
    });

    function getFavoritos() {
        var favoritos = localStorage.getItem("favoritos");
        return favoritos ? JSON.parse(favoritos) : [];
    }
  
    function checkFavorito(countryCode) {
        var favoritos = getFavoritos();
        return favoritos.includes(countryCode);
    }
    
    function addFavorito(countryCode) {
        var favoritos = getFavoritos();
        if (!favoritos.includes(countryCode)) {
            favoritos.push(countryCode);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }

    function removeFavorito(countryCode) {
        var favoritos = getFavoritos();
        var index = favoritos.indexOf(countryCode);
        if (index !== -1) {
            favoritos.splice(index, 1);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }

    function toggleFavorito(countryCode) {
        if (checkFavorito(countryCode)) {
            removeFavorito(countryCode);
        } else {
            addFavorito(countryCode);
        }
    }
}