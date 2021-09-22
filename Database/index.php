<?php
$arquivo = $_SERVER['DOCUMENT_ROOT'] . "/PHPTEST/Database/base.txt";

$usuario = $_POST['data'];

$dados = json_decode($usuario, true);

$txt = [];

if (file_get_contents("base.txt")) {
    if (file_get_contents("base.txt") === $dados['cep']) {
        var_dump('é igual');
    } else {
        var_dump('é diferente');
    }
} else {
    foreach ($txt as $key => $value) {
        array_push($txt, $dados['cep']);
    }

    var_dump($txt);
    
    // $fp = fopen($arquivo, "r+");

	// fwrite($fp, json_encode($txt));
	
	// fclose($fp);
}

// if(strpos(file_get_contents("base.txt"),$dados['cep']) !== false) {
    
//     if (file_get_contents("base.txt") == $dados['cep']) {
//         var_dump('é igual');
//     } else {
//         var_dump('é diferente');
//     }
    
// }else{
// 	$fp = fopen($arquivo, "r+");

// 	fwrite($fp, $dados['cep']);
	
// 	fclose($fp);
// }