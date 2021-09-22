var options_cep = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['00000-000'],
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

var getAdress = (data) => {
    let dados = JSON.parse(data);
    let cep = dados.cep;
    
    let url = `https://viacep.com.br/ws/${cep}/json`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: "json",
        success: function(result){
            console.log(result);
        },
        error: function(erro) {
            console.log(erro);
        }
    });
}


$(function() {
    $("#form").submit(function(e) {
        e.preventDefault();

        let cep = $("#cep").val();

        cep = cep.replace('-', '');

        var data = {
            'cep': cep,
        }

        var dados = JSON.stringify(data);

        // getAdress(dados);

        if (!cep) {
           myFunc(notify, ['Por favor, insira o cep.', 'danger'])
        } else {
            $.ajax({
                url: './Database/index.php',
                type: 'POST',
                data: {data: dados},
                success: function(result){
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // Retorno caso algum erro ocorra
                }
            });
        }
    });
});
