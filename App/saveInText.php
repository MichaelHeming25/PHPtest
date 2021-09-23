<?php
$arquivo = $_SERVER['DOCUMENT_ROOT'] . "/PHPTEST/App/base.txt";

$dados = $_POST['data'];

$dados = json_decode($dados, true);

$txt = [];

// Verificando se tem algum dado registrado na base
if (file_get_contents("base.txt")) {
    
    // Recuperando dados da base para verificação
    $base = json_decode(file_get_contents("base.txt"));

    // Verificando se algum dado da base é igual ao dado informado, caso não for irá gravar um novo dado na base
    $existe = 0;
    foreach ($base as $key => $value) {
        if ($dados['cep'] == $value->cep) {
            $returnData = $value;
            $existe = 1;
        }
    }

    if ($existe == 1) {
        echo json_encode($returnData);
    } else {
        echo json_encode($dados);

        array_push($base, $dados);

        $fp = fopen($arquivo, "r+");

        fwrite($fp, json_encode($base));
        
        fclose($fp);
    }

} else {
    echo json_encode($dados);
    
    $txt = [
        ['cep' => $dados['cep'],
        'logradouro' => $dados['logradouro'],
        'complemento' => $dados['complemento'],
        'bairro' => $dados['bairro'],
        'localidade' => $dados['localidade'],
        'uf' => $dados['uf'],
        'ddd' => $dados['ddd']]
    ];

    $fp = fopen($arquivo, "r+");

	fwrite($fp, json_encode($txt));
	
	fclose($fp);
}