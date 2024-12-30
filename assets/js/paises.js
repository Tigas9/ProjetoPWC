var api_url = "https://restcountries.com/v3.1/";

// AO carregar a página
$(document).ready(function () {
    fetchCountries();
    $("#button-pesquisar").on("click", function () {
        var inputText = $("#nomepais").val().trim();

        if (inputText === "") {
            fetchCountries();
        } else {
            fetchCountry(inputText.toLowerCase());
        }
    });
});

function fetchCountries() {
    $.ajax({
        url: api_url + "all",
        method: "GET",
        success: function (data) {
            displayCountries(data);
        },
        error: function () {
            alert("Erro ao encontrar países");
        }
    });
}

function fetchCountry(inputText) {
    $.ajax({
        url: api_url + "name/" + inputText,
        method: "GET",
        success: function (data) {
            displayCountry(data);
        },
        error: function () {
            alert("País não encontrado");
        }
    });
}

function displayCountry(arrayCountry) {
    var listaCountry = $("#lista-paises");
    listaCountry.empty();

    arrayCountry.forEach(country => {
        var isFavorito = checkFavorito(country.cca3);
        var countryCard = `<div class="card">
                                <div class="card shadow-sm">
                                    <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="card-img-top" style="height: 150px; object-fit: cover;">
                                    <div class="card-body">
                                        <p class="card-text">${country.name.common}</p>
                                        <p class="card-text">Nome Oficial do País: ${country.name.official}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                                <p><a href="detalhespais.html?countryCode=${country.cca3}" class="btn btn-primary btn-sm">Ver Detalhes</a></p>
                                                <button class="btn btn-${isFavorito ? "danger" : "secondary"} btn-sm toggle-favorito" data-country-code="${country.cca3}">
                                                    ${isFavorito ? "Remover Favorito" : "Adicionar aos Favoritos"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        listaCountry.append(countryCard);
    });

    $(".toggle-favorito").on("click", function () {
        var countryCode = $(this).data("country-code");
        toggleFavorito(countryCode);
        fetchCountries(); // Atualiza a lista de países após a modificação dos favoritos.
    });
}

function displayCountries(arrayCountries) {
    var listaCountries = $("#lista-paises");
    listaCountries.empty();

    arrayCountries.forEach(country => {
        var isFavorito = checkFavorito(country.cca3);
        var countryCard = `<div class="card">
                                <div class="card shadow-sm">
                                    <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="card-img-top" style="height: 150px; object-fit: cover;">
                                    <div class="card-body">
                                        <p class="card-text">${country.name.common}</p>
                                        <p class="card-text">Nome Oficial do País: ${country.name.official}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                                <p><a href="detalhespais.html?countryCode=${country.cca3}" class="btn btn-primary btn-sm">Ver Detalhes</a></p>
                                                <button class="btn btn-${isFavorito ? "danger" : "secondary"} btn-sm toggle-favorito" data-country-code="${country.cca3}">
                                                    ${isFavorito ? "Remover Favorito" : "Adicionar aos Favoritos"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        listaCountries.append(countryCard);
    });

    $(".toggle-favorito").on("click", function () {
        var countryCode = $(this).data("country-code");
        toggleFavorito(countryCode);
        fetchCountries(); // Atualiza a lista de países após a modificação dos favoritos.
    });
}

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