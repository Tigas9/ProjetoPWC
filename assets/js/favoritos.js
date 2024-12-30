var api_url = "https://restcountries.com/v3.1/";

//Ao carregar a página de favoritos:
$(document).ready(function () {
    fetchFavoritos();  //Carrega os países favoritos
});

//Função para ir buscar os favoritos da local storage e exibir os detalhes dos países
function fetchFavoritos() {
    var favoritos = getFavoritos();

    if (favoritos.length === 0) {
        $("#lista-favoritos").html("<p>A lista de favoritos está vazia.</p>");  //Se não houver favoritos
    } else {
        favoritos.forEach(function (countryCode) {
            fetchCountryByCode(countryCode);  //Vai buscar as informações de cada país favorito
        });
    }
}

//Função para ir buscar informações de um país pelo código
function fetchCountryByCode(countryCode) {
    $.ajax({
        url: api_url + "alpha/" + countryCode,  //Procura pelo código do país
        method: "GET",
        success: function (data) {
            displayCountry(data[0]);  //Mostra o país retornado
        },
        error: function () {
            console.error("Erro ao carregar país com código: " + countryCode);
        }
    });
}

//Função para mostrar os países na lista de favoritos
function displayCountry(country) {
    var listaFavoritos = $("#lista-favoritos");  //Container onde os favoritos vão aparecer
    var countryCard = `<div class="col mb-3">
                        <div class="card">
                            <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="card-img-top" style="height: 150px; object-fit: cover;">
                            <div class="card-body">
                                <p class="card-text">${country.name.common}</p>
                                <p class="card-text">Nome Oficial: ${country.name.official}</p>
                                <button class="btn btn-danger btn-sm remove-favorito" data-country-code="${country.cca3}">
                                    Remover dos Favoritos
                                </button>
                            </div>
                        </div>
                    </div>`;
    listaFavoritos.append(countryCard);  //Adiciona o card à lista de favoritos

    //Adiciona o evento para remover o país dos favoritos
    $(".remove-favorito").on("click", function () {
        var countryCode = $(this).data("country-code");
        removeFavorito(countryCode);  //Remove o país dos favoritos
        $(this).closest(".col").remove();  //Remove o card do país da página
    });
}

//Função para ir buscar os países favoritos da local storage
function getFavoritos() {
    var favoritos = localStorage.getItem("favoritos");
    return favoritos ? JSON.parse(favoritos) : [];  //Retorna um array de favoritos ou um array vazio
}

//Função para remover um país dos favoritos
function removeFavorito(countryCode) {
    var favoritos = getFavoritos();
    var index = favoritos.indexOf(countryCode);
    if (index !== -1) {
        favoritos.splice(index, 1);  //Remove o país da lista
        localStorage.setItem("favoritos", JSON.stringify(favoritos));  //Atualiza a local storage
    }
}