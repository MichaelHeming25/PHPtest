# PHPtest

Teste de seleção para vaga PHP

## Requisitos.

  ● APACHE.
  
  ● PHP 5.6 ou superior.
  
  ● MYSQL.
  
  
## Instalação.

  ● git clone https://github.com/MichaelHeming25/PHPtest

  ● Importar no mysql a base de dados que esta na raiz do projeto (db.sql)
  
  ● Se estiver utilizando o xampp, adicionar os arquivos na pasta "htdocs", caso esteja utilizando o wamp, adicionar os arquivos na pasta "C:\wamp\www"
  
  
## Métodos para salvar os dados de endereço.

Há 2 maneiras de salvar os dados de endereço, salvando os dados no banco de dados, ou salvando os dados em um documento de texto "Base.txt"
Caso queira salvar os dados no banco de dados, vá até "Assets/script.js" e altere a url do ajax, na função "recordData" para: "./App/saveInDatabase.php". Caso queira salvar os dados na base de texto, altere a url para: "./App/saveInText.php".
