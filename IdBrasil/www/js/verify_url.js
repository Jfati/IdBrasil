function verify_url() {
    $("#btt_url_search").click(function () {
        var url = $("#input_url_search").val();
        if (url != "") {
            getRegistroBRData(url);
        }
    })

    $("#input_url_search").keyup(function (event) {
        //if enter pressed
        if (event.keyCode == 13) {

            var url = $("#input_url_search").val();
            if (url != "") {
                getRegistroBRData(url);
            }
        }
    })
}

function getRegistroBRData(domain) {
    $('#div_url_registro_br').show();

    $("#input_url_search").val(domain);
    app.preloader.show();
    $("#status_code").text("");
    $("#status").text("");
    $("#fqdn").text("");
    $("#hosts").text("");
    $("#suggestions").text("");
    $("#publication_status").val("");
    $.ajax({
        url: `https://brasilapi.com.br/api/registrobr/v1/${domain}`,
        method: 'GET',

    }).done(function (data) {
        console.log(data);
        $('#status_code').text(data.status_code);
        $('#status').text(data.status);
        if (data.status == 'REGISTERED') {
            $('#status').text('Registrado');
            $("#status").css("color", "red");
        } else {
            $('#status').text('Não Registrado');
            $("#status").css("color", "green");
        }
        $('#fqdn').text(data.fqdn);

        if (data.hosts) {
            $('#hosts').text(data.hosts.join(', '));

        }

        $('#publication_status').text(data['publication-status']);
        $('#expires_at').text(data['expires-at']);
        //verificar se tem sugestões
        if (data.suggestions) {
            //remover .com .com.br .app
            let name_fqdn = data.fqdn.split('.');
            name_fqdn = name_fqdn[0];
            let suggestions = ""
            data.suggestions.forEach(suggestion => {
                //transformar em <a onclick="getRegistroBRData('nome(data.fqdn) e sugestao(.com)')">nome e sugestao(.com)</a>
            
                suggestions += `<a onclick="getRegistroBRData('${name_fqdn}.${suggestion}')">${name_fqdn}.${suggestion}</a> , `
            })
        $('#suggestions').html(suggestions);

        }


        app.preloader.hide();
    }).fail(function (a, b, c) {
        console.log(a, b, c);
        app.preloader.hide();
        app.alert({
            title: 'Falha',
            message: 'Não foi possível obter os dados.',
        })
    })
}
