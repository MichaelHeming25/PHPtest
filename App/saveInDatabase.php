<?php
	include("../db/conexao.php");
	$data = $_POST['data'];
	$dados = json_decode($data);

	$cep = str_replace('-', '', $dados->cep);

	if ($_POST) {
		$PDO = new PDO("mysql:host=$HOST;dbname=$DB_NAME", $DB_USERNAME, $DB_PASSWORD);
		$PDO->exec("set names utf8");

		$consulta = $PDO->query("SELECT * FROM `cep` WHERE cep = $cep;");
		$consulta = $consulta->fetch(PDO::FETCH_ASSOC);

		// Verificando se já existe o cep informado, caso não exista irá adicionar um novo cep no banco
		if ($consulta) {
			echo json_encode($consulta);
		} else {
			try {
				$comandoSQL = "INSERT INTO `cep` (`cep`, `logradouro`, `complemento`, `bairro`, `localidade`, `uf`, `ddd`)
				VALUES ($cep, '$dados->logradouro', '$dados->complemento', '$dados->bairro', '$dados->localidade', '$dados->uf', $dados->ddd);";
				$grava = $PDO->prepare($comandoSQL);
				$grava->execute(array());
				
				$return = $PDO->query("SELECT * FROM `cep` WHERE cep = $cep;");
				$return = $return->fetch(PDO::FETCH_ASSOC);
				echo json_encode($return);

			} catch(PDOException $e) {
				echo('Erro: ' . $e->getMessage()); 
			}
		}
	} 
?>
