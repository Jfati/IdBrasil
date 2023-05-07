document.addEventListener('deviceready', onDeviceReady.bind(this), false);
var app = new Framework7({
	root: '#app',
	name: 'AppPrefab',
	id: 'crom.appprefab',
	panel: {
		swipe: 'left',
	},
	routes: [
		{
			path: '/index/',
			url: 'index.html',
			on: {
				pageInit: function (event, page) {
					app.views.main.router.navigate('/home/');
					setTimeout(() => {
					}, 5000);
				}
			}
		},
		{
			path: '/home/',
			url: 'home.html',
			on: {
				pageInit: function (event, page) {
					$(".link_browser").click(function (e) {
						e.preventDefault();
						openInAppBrowser(this.href);
					});

				}
			}
		},
		{
			path: '/verify_url/',
			url: 'verify_url.html',
			on: {
				pageInit: function (event, page) {
					$('#div_url_registro_br').hide();
					verify_url()
				}
			}
		},
		{
			path: '/bloco_partidario/',
			url: 'bloco_partidario.html',
			on: {
				pageInit: function (event, page) {

					carregarBlocos()
				}
			}
		},
		{
			path: '/deputados/',
			url: 'deputados.html',
			on: {
				pageInit: function (event, page) {
					getDeputados();
				}
			}
		},
		{
			path: '/deputado/:id',
			url: 'deputado.html',
			on: {
				pageInit: function (event, page) {
					var id_deputado = page.route.params.id;
					buscarDeputado(id_deputado);
				}
			}
		},
		{
			path: '/despesas/:id',
			url: 'despesas.html',
			on: {
				pageInit: function (event, page) {
					var id_deputado = page.route.params.id;
					GetDespesasDeputado(id_deputado);
				}
			}
		},
		{
			path: '/eventos_legislativos_camera/',
			url: 'eventos_legislativos_camera.html',
			on: {
				pageInit: function (event, page) {
					GetEventosLegislativosCamera()
				}
			}
		},
		{
			path: '/partidos/',
			url: 'partidos.html',
			on: {
				pageInit: function (event, page) {
					GetPartidos()
				}
			}
		},
		{
			path: '/partido/:id',
			url: 'partido.html',
			on: {
				pageInit: function (event, page) {
					let id = page.route.params.id
					GetPartido(id)
				}
			}
		}

	],
});

var $$ = Dom7;

function onDeviceReady() {
	var mainView = app.views.create('.view-main', {
		url: '/index/'
	});

	document.addEventListener("backbutton", onBackKeyDown, false);
	function onBackKeyDown() {
		var nome = app.views.main.router.url;

		if (nome == '/home/') {
			app.views.main.router.navigate('/index/');
		}
		if (nome == '/index/') {
			app.views.main.router.back();
		}
	}
}