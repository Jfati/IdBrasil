

# IdBrasil - Aplicativo Android para consulta de informações públicas

Este é um projeto de aplicativo Android que utiliza APIs públicas do site https://brasilapi.com.br/ e do https://dadosabertos.camara.leg.br/swagger/api.html para fornecer informações sobre CPF, abertura de contas bancárias, votações na Câmara dos Deputados, além de informações sobre deputados.

O aplicativo foi desenvolvido usando Cordova, HTML, JS e CSS, com o framework7. O nome do aplicativo é IdBrasil.

## Instalação

Para instalar o aplicativo, baixe o código-fonte do repositório. Instale o cordova usando npm. ` npm install cordova`. Execute o comando `cordova build android` ou `cordova build browser` para iniciar via browser na pasta raiz do projeto. Em seguida, conecte seu dispositivo Android ao computador e execute o comando `cordova run android` com o usb conectado e modo de depuração ativado. Caso queira iniciar no browser ` cordova run browser` para executar o aplicativo.

Atenção para geração de apk ou ` cordova build android`. Leia a documentação: https://cordova.apache.org/docs/en/11.x/guide/platforms/android/index.html

## Uso

Ao abrir o aplicativo, você será apresentado a um menu que permite acessar as diferentes funcionalidades disponíveis. Você pode selecionar uma opção para acessar informações sobre CPF, abertura de contas bancárias, votações na Câmara dos Deputados ou informações sobre deputados.

Para cada funcionalidade, o aplicativo faz uma chamada à API correspondente para recuperar as informações relevantes e apresentá-las ao usuário.

## Imagens
![Alt Text](Imagens/Screenshot%202023-05-08%20at%2015-58-41%20AppPrefab.png)
![Alt Text](Imagens/Screenshot%202023-05-08%20at%2015-58-56%20AppPrefab.png)
![Alt Text](Imagens/Screenshot%202023-05-08%20at%2015-59-22%20AppPrefab.png)
![Alt Text](Imagens/Screenshot%202023-05-08%20at%2016-02-42%20AppPrefab.png)

## Contribuição

Este projeto é restrito para um grupo fechado de desenvolvedores que têm acesso para atualizar o código-fonte e as funcionalidades do aplicativo. Caso você deseje contribuir, entre em contato com o administrador do projeto.

juan.candidoferreira@gmail.com - J 

## Licença

Este projeto é licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
