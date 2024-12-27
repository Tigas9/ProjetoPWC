$(document).ready(function() {
    // Captura o parâmetro da URL
    var urlParams = new URLSearchParams(window.location.search);
    var cca3 = urlParams.get('cca3'); // 'cca3' é o código do país

    // Faz a requisição à API para obter os dados do país
    var api_url = `https://restcountries.com/v3.1/alpha/${cca3}`;

    $.ajax({
        url: api_url,
        method: "GET",
        success: function(data) {
            // Mostra os detalhes do país
            var country = data[0];
            $('#country-name').text(country.name.common);
            $('#country-flag').attr('src', country.flags.png);
            $('#country-capital').text(country.capital ? country.capital[0] : 'Não disponível');
            $('#country-population').text(country.population.toLocaleString());
            $('#country-area').text(country.area.toLocaleString() + ' km²');
            $('#country-currencies').text(Object.values(country.currencies)[0].name);
            $('#country-region').text(country.region);
            $('#country-map').attr('href', country.maps.googleMaps).text("Ver no Google Maps");
        },
        error: function() {
            alert("Erro ao buscar os dados do país");
        }
    });
});
