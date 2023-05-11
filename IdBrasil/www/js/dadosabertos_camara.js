function carregarBlocos() {
  $.ajax({
    url: "https://dadosabertos.camara.leg.br/api/v2/blocos",
    data: { id: 1, ordem: "ASC", ordenarPor: "nome" },
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response);
      var lista = "";
      $.each(response.dados, function (i, bloco) {
        lista += "<li>";
        lista += "<div class='item-content'>";
        lista += "<div class='item-inner'>";
        lista += "<div class=''>" + bloco.nome + "</div>";
        lista += "<div class='item-after'>" + bloco.id + "</div>";
        lista += "</div>";
        lista += "</div>";
        lista += "</li>";
      });
      $("#result_blocos ul").html(lista);
    },
    error: function (xhr, status, error) {
      alert("Erro ao carregar blocos!");
    }
  });
}

// JS
// Função para acessar a API da Câmara dos Deputados usando Ajax
function getDeputados() {
  let nome = $("#input_search_deputado").val() || "";
  app.preloader.show();
  // URL da API com os parâmetros necessários
  var url = "https://dadosabertos.camara.leg.br/api/v2/deputados";

  // Requisição Ajax usando o método GET
  $.ajax({
    url: url,
    type: "GET",
    dataType: "xml",
    data: {
      ordem: "ASC",
      ordenarPor: "nome",
      nome: nome
    },
    success: function (data) {
      // Variável para armazenar o HTML a ser adicionado
      var html = "";

      // Loop para iterar sobre os elementos da tag <dados>
      $(data)
        .find("dados > deputado_")
        .each(function () {
          // Variáveis para armazenar as informações do deputado
          var nome = $(this).find("nome").text();
          var partido = $(this).find("siglaPartido").text();
          var uf = $(this).find("siglaUf").text();
          var foto = $(this).find("urlFoto").text();
          var id_deputado = $(this).find("id").text();


          // Adiciona as informações do deputado ao HTML
          html += '<li><a class="link" href="/deputado/' + id_deputado + '">';
          html += '<div class="item-content">';
          html += '<div class="item-media"><img src="' + foto + '" class="img_result_deputado"></div>';
          html += '<div class="item-inner">';
          html += '<div class="item-title">' + nome + '</div>';
          html += '<div class="item-after">' + partido + ' - ' + uf + '</div>';
          html += '</div>';
          html += '</div></a>';
          html += '</li>';
        });

      // Adiciona o HTML gerado à página
      $("#result_deputados ul").html(html);
      app.preloader.hide();
    },
    error: function () {
      // Caso ocorra um erro na requisição Ajax, exibe uma mensagem de erro
      app.dialog.alert("Ocorreu um erro ao carregar os dados.");
    },
  }).done(function (data) {
    console.log(data);
  }).fail(function (xhr, status, error) {
    console.log(xhr, status, error);
  })
}

// Chama a função para carregar os deputados na página

// Função para buscar informações de um deputado pelo ID usando a API da Câmara dos Deputados
function buscarDeputado(idDeputado) {
  //href
  $('#btt_despesas').attr('href', '/despesas/' + idDeputado);
  $('#btt_profissao').click(function () {
    GetProfissaoDeputado(idDeputado);
  })
  $.ajax({
    url: `https://dadosabertos.camara.leg.br/api/v2/deputados/${idDeputado}`,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response)
      // Separando as informações do XML retornado
      $("#img_deputado").attr("src", response.dados.ultimoStatus.urlFoto);
      $("#nomeCivil").text(response.dados.nomeCivil);
      $("#nome").text(response.dados.ultimoStatus.nome);
      $("#nomeEleitoral").text(response.dados.ultimoStatus.nomeEleitoral);
      $("#siglaPartido").text(response.dados.ultimoStatus.siglaPartido);
      $("#siglaUf").text(response.dados.ultimoStatus.siglaUf);
      $("#idLegislatura").text(response.dados.ultimoStatus.idLegislatura);
      $("#email").text(response.dados.ultimoStatus.email);
      $("#data").text(response.dados.ultimoStatus.data);
      $("#situacao").text(response.dados.ultimoStatus.situacao);
      $("#condicaoEleitoral").text(response.dados.ultimoStatus.condicaoEleitoral);

      $("#nome_gabinete").text(response.dados.ultimoStatus.gabinete.nome);
      $("#gabinete_predio").text(response.dados.ultimoStatus.gabinete.predio);
      $("#gabinete_sala").text(response.dados.ultimoStatus.gabinete.sala);
      $("#gabinete_andar").text(response.dados.ultimoStatus.gabinete.andar);
      $("#gabinete_telefone").text(response.dados.ultimoStatus.gabinete.telefone);
      $("#gabinete_email").text(response.dados.ultimoStatus.gabinete.email);

      $("#cpf").text(response.dados.cpf);
      $("#sexo").text(response.dados.sexo);
      $("#dataNascimento").text(response.dados.dataNascimento);
      $("#dataFalecimento").text(response.dados.dataFalecimento);
      $("#ufNascimento").text(response.dados.ufNascimento);
      $("#municipioNascimento").text(response.dados.municipioNascimento);
      $("#escolaridade").text(response.dados.escolaridade);



      if (response.dados.redeSocial != null) {
        $("#div_redesocial").show();
        for (var i = 0; i < response.dados.redeSocial.length; i++) {
          //button link external rede social
          let nomeRedeSocial = response.dados.redeSocial[i].replaceAll("https://", "")
          nomeRedeSocial = nomeRedeSocial.replaceAll("https://www.", "")
          nomeRedeSocial = nomeRedeSocial.replaceAll("http://www.", "")
          nomeRedeSocial = nomeRedeSocial.replaceAll("www.", "")
          nomeRedeSocial = nomeRedeSocial.replaceAll("WWW.", "")
          //separar e pegar nome
          nomeRedeSocial = nomeRedeSocial.split(".")
          console.log(nomeRedeSocial)
          nomeRedeSocial = nomeRedeSocial[0]


          $("#redesSocial").append('<li><a class=" link_browser button button-outline" href="' + response.dados.redeSocial[i] + '" >' + nomeRedeSocial + '</a></li>')
        }
      } else {
        $("#div_redesocial").hide();
      }
      $(".link_browser").click(function (e) {
        e.preventDefault();
        openInAppBrowser(this.href);
      });

    },
    error: function (error) {
      console.log(error);
    }
  });
}


function GetDespesasDeputado(id) {
  app.preloader.show();
  $.ajax({
    url: "https://dadosabertos.camara.leg.br/api/v2/deputados/" + id + "/despesas",
    type: "GET",
    data: {
      itens: 10000,
      ordem: "ASC",
      ordenarPor: "ano"
    },
    headers: {
      accept: "application/json"
    },
    success: function (response) {
      console.log(response);
      for (var i = 0; i < response.dados.length; i++) {
        $("#result_despesas").append(`
  <tr>
  <td>${response.dados[i].ano}</td>
  <td>${response.dados[i].mes}</td>
  <td>${response.dados[i].tipoDespesa}</td>
  <td>${response.dados[i].codDocumento}</td>
  <td>${response.dados[i].tipoDocumento}</td>
  <td>${response.dados[i].codTipoDocumento}</td>
  <td>${response.dados[i].dataDocumento}</td>
  <td>${response.dados[i].numDocumento}</td>
  <td>${response.dados[i].valorDocumento}</td>
  <td>${response.dados[i].urlDocumento}</td>
  <td>${response.dados[i].nomeFornecedor}</td>
  <td>${response.dados[i].cnpjCpfFornecedor}</td>
  <td>R$${response.dados[i].valorLiquido}</td>
  <td>${response.dados[i].valorGlosa}</td>
  <td>${response.dados[i].numRessarcimento}</td>
  <td>${response.dados[i].codLote}</td>
  <td>${response.dados[i].parcela}</td>
  </tr>
  `);
      }
      app.preloader.hide();
    },
    error: function (xhr, status, error) {
      console.log("Erro ao fazer a solicitação:", error);
    }
  });
}
/*
<xml>
  <dados>
    <profissao>
      <dataHora>2018-08-14T16:36</dataHora>
      <codTipoProfissao>324</codTipoProfissao>
      <titulo>Militar</titulo>
    </profissao>
  </dados>
  <links>
    <link>
      <rel>self</rel>
      <href>https://dadosabertos.camara.leg.br/api/v2/deputados/74847/profissoes</href>
    </link>
  </links>
</xml> */
function GetProfissaoDeputado(id) {
  $.ajax({
    url: 'https://dadosabertos.camara.leg.br/api/v2/deputados/' + id + '/profissoes',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      // extrai a profissão do resultado
      console.log(result);
      let profissao_deputado = ""

      for (var i = 0; i < result.dados.length; i++) {
        profissao_deputado += result.dados[i].titulo + ": " + result.dados[i].dataHora + "<br>";
      }

      console.log(profissao_deputado);

      app.dialog.alert(profissao_deputado,
        'Profissão')
    },
    error: function (error) {
      console.log(error);
    }
  });

}

function GetEventosLegislativosCamera() {
  $.ajax({
    url: "https://dadosabertos.camara.leg.br/api/v2/eventos?ordem=ASC&ordenarPor=dataHoraInicio&itens=1000",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      data.dados.forEach(element => {
        $("#result_eventos_legislativos").append(`
        <li>
        <a class="item-content link" href="/evento/">
       
          <div class="item-inner">
            <div class="item-title">${element.descricaoTipo}</div>
            <small class="item-after">${element.situacao}</small>
            <div class="item-after">${element.dataHoraInicio}</div>
          </div>
        </a>
      </li>
      `);

      });
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
    }
  });

}

function GetPartidos() {
  $.ajax({
    url: 'https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data);

      data.dados.forEach(element => {
        $("#result_partidos").append(

          `
                <li>
                  <a class="item-content link" href="/partido/${element.id}">
                    <div class="item-inner">
                      <div class="item-title">${element.nome}</div>
                      <div class="item-after">${element.sigla}</div>
                    </div>
                  </a>
                </li>
          `);
      });


    },
    error: function (xhr, textStatus, errorThrown) {
      console.log('Erro na requisição: ' + textStatus + ' - ' + errorThrown);
    }
  });
}

function GetPartido(id) {
  $.ajax({
    url: "https://dadosabertos.camara.leg.br/api/v2/partidos/" + id,
    headers: {
      Accept: "application/json",
    },
    method: "GET",
    success: function (data) {
      console.log(data)
      $("#img_partido").attr("src", data.dados.urlLogo);
      $('#id').text(data.dados.id);
      $('#nome').text(data.dados.nome);
      $('#sigla').text(data.dados.sigla);
      $('#totalMembros').text(data.dados.status.totalMembros);
      $('#totalPosse').text(data.dados.status.totalPosse);
      $('#situacao').text(data.dados.status.situacao);

      let id_lider = data.dados.status.lider.uri;
      id_lider = id_lider.replace("https://dadosabertos.camara.leg.br/api/v2/deputados/", "");


      $("#btt_lider").click(function (e) {
        e.preventDefault();
        app.views.main.router.navigate('/deputado/' + id_lider);
      })

      let id_partido = id;

      $("#btt_membros").click(function (e) {
        e.preventDefault();

        app.views.main.router.navigate('/partido_list_members/' + id);
      })
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function GetMembrosPartido(id) {
  //create page template framework7
  $.ajax({
    url: "https://dadosabertos.camara.leg.br/api/v2/partidos/" + id + "/membros",
    headers: { "accept": "application/json" },
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    error: function () {
      console.log("Ocorreu um erro ao obter os membros do partido.");
    }
  });
}

function getDeputadosPartido(partido) {
  let nome = $("#input_search_deputado").val() || "";
  app.preloader.show();
  // URL da API com os parâmetros necessários
  var url = "https://dadosabertos.camara.leg.br/api/v2/partidos/" + partido + "/membros";

  // Requisição Ajax usando o método GET
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",

    error: function () {
      // Caso ocorra um erro na requisição Ajax, exibe uma mensagem de erro
    },
  }).done(function (data) {
    console.log(data.dados);

    // Variável para armazenar o HTML a ser adicionado
    var html = "";

    $("#partido_nome").text(data.dados.nome);

    // Loop para iterar sobre os elementos da tag <dados>

    for (let i = 0; i < data.dados.length; i++) {
      const element = data.dados[i];
      console.log(element);

      let nome = element.nome;
      let partido = element.siglaPartido;
      let uf = element.siglaUf;
      let foto = element.urlFoto;
      let id_deputado = element.id;
      html += '<li><a class="link" href="/deputado/' + id_deputado + '">';
      html += '<div class="item-content">';
      html += '<div class="item-media"><img src="' + foto + '" class="img_result_deputado"></div>';
      html += '<div class="item-inner">';
      html += '<div class="item-title">' + nome + '</div>';
      html += '<div class="item-after">' + partido + ' - ' + uf + '</div>';
      html += '</div>';
      html += '</div></a>';
      html += '</li>';
    }


    // Adiciona o HTML gerado à página
    $("#result_deputados_list_members ul").html(html);
    app.preloader.hide();
  }).fail(function (xhr, status, error) {
    console.log(xhr, status, error);
    app.dialog.alert("Ocorreu um erro ao carregar os dados.");
  })
}