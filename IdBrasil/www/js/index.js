function openInAppBrowser(url) {
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        window.open(url);
        return;
    }
    var target = "_blank";
    var options = "location=yes,hidden=yes";

    var ref = cordova.InAppBrowser.open(url, target, options);



    ref.addEventListener('loadstart', function () {
        // Quando a página começa a carregar
        console.log('Iniciando carregamento da página');
    });

    ref.addEventListener('loadstop', function () {
        // Quando a página termina de carregar
        console.log('Página carregada com sucesso');

        ref.show(); // Exibe a página após o carregamento
        console.log(ref);
        var meuIframe = document.getElementsByTagName('iframe')[0]
        var elementoPai = meuIframe.parentElement;
        elementoPai.classList.add('content_iframe');


    });

    ref.addEventListener('loaderror', function (event) {
        // Quando ocorre um erro no carregamento da página
        console.log('Erro ao carregar a página: ' + event.message);

        // Tenta abrir a URL em uma nova aba
        window.open(url, '_blank');
    });
}
