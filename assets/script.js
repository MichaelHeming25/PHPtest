var options_cep = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['00000-000'],
            mask = (cpf.length > 14) ? masks[1] : masks[0];
        el.mask(mask, op);
    }
};

$('#ddd').mask('(00)', options_ddd);

var options_ddd = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['(00)'],
            mask = (cpf.length > 14) ? masks[1] : masks[0];
        el.mask(mask, op);
    }
};

$('#cep').mask('00000-000', options_cep);

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

var notify = (message, type) => {
    $.notify({
        icon: 'fas fa-exclamation-circle',
        message: message,
    },{
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 1,
        z_index: 1050,
        delay: 4000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animate__animated animate__fadeInDown',
            exit: 'animate__animated animate__fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" fade show role="alert">' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="position:absolute;right:0;margin-right:1rem;"></button>' +
        '</div>' 
    });
} 

function myFunc(callback, args)
{
    callback.apply(this, args);
}

// Ajax responsavel pela requisição de dados na API
var findAddress = () => {
    $("#form").submit(function(e) {
        e.preventDefault();

        let cep = $("#cep").val();
        cep = cep.replace('-', '');
        
        let url = `https://viacep.com.br/ws/${cep}/xml`;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "xml",
            success: function(result){
                if (result.getElementsByTagName("erro")[0]) {
                    myFunc(notify, ['O CEP inserido não é válido.', 'danger'])
                } else {
                    
                    var data = {
                        'cep' : result.getElementsByTagName("cep")[0].innerHTML,
                        'logradouro' : result.getElementsByTagName("logradouro")[0].innerHTML,
                        'complemento' : result.getElementsByTagName("complemento")[0].innerHTML,
                        'bairro' : result.getElementsByTagName("bairro")[0].innerHTML,
                        'localidade' : result.getElementsByTagName("localidade")[0].innerHTML,
                        'uf' : result.getElementsByTagName("uf")[0].innerHTML,
                        'ddd' : result.getElementsByTagName("ddd")[0].innerHTML
                    }
    
                    recordData(data);
                }
            },
            error: function(erro) {
                alert('cep invalido');
            }
        });
    });
}

// Ajax responsavel por gravador os dados na base
var recordData = (data) => {
    var dados = JSON.stringify(data);
    $.ajax({
        // Caso queira salvar os dados do endereço em um documento de texto utilize a url: './App/saveInText.php'
        // caso queira salvar no banco de dados utilize a url: './App/saveInDatabase.php'
        url: './App/saveInDatabase.php',
        type: 'POST',
        data: {data: dados},
        success: function(result){

            let dados = JSON.parse(result);
            let cep = dados.cep;
            let logradouro = dados.logradouro;
            let complemento = dados.complemento;
            let bairro = dados.bairro;
            let localidade = dados.localidade;
            let uf = dados.uf;
            let ddd = dados.ddd;

            $("body").append(`
                <div class="modal fade" id="modalEnderecos" tabindex="-1" aria-labelledby="modalEnderecosLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalEnderecosLabel">Informações do cep: ${cep}</h5>
                            <button type="button" class="btn-close" id="clear" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        
                            <div class="row">
                                <div class="form-group col-2">
                                    <label for="cep">CEP</label>
                                    <input type="text" name="cep" id="cep" value="${cep}" style="pointer-events: none">
                                </div>
                                <div class="form-group col-6">
                                    <label for="logradouro">Logradouro:</label>
                                    <input type="text" name="logradouro" id="logradouro" value="${logradouro}" style="pointer-events: none">
                                </div>
                                <div class="form-group col-4">
                                    <label for="complemento">Complemento:</label>
                                    <input type="text" name="complemento" id="complemento" value="${complemento}" style="pointer-events: none">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="form-group col-5">
                                    <label for="bairro">Bairro:</label>
                                    <input type="text" name="bairro" id="bairro" value="${bairro}" style="pointer-events: none">
                                </div>
                                <div class="form-group col-3">
                                    <label for="localidade">Localidade:</label>
                                    <input type="text" name="localidade" id="localidade" value="${localidade}" style="pointer-events: none">
                                </div>
                                <div class="form-group col-2">
                                    <label for="uf">UF:</label>
                                    <input type="text" name="uf" id="uf" value="${uf}" style="pointer-events: none">
                                </div>
                                <div class="form-group col-2">
                                    <label for="ddd">DDD:</label>                            
                                    <input type="text" name="ddd" id="ddd" value="${ddd}" style="pointer-events: none">
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            `); 

            $("#modalEnderecos").modal("show");
            
            $("#clear").click(function() {
                console.log('teste');
                $(".modal").remove();
                $(".modal-backdrop").remove();
            });
        },
        error: function(error) { console.log(error) }
    });
}

$(document).ready(function() {
    findAddress();
});