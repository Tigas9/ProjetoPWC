//AO carregar a pagina
$(document).ready(function(){
    $("#button-pesquisar").on("click", function(){
        var inputText = $("#nomepais").val().trim();
        fetchCountry(inputText);
    })
});

function fetchCountry(inputText){
    var api_url = "https://restcountries.com/v3.1/name/" + inputText;

    $.ajax({
        url: api_url,
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
        listaCountry.append(countryCard);
    });
}