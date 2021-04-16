const order = require("../../models/order");

$(document).ready(()=>{
    const orderValidator = async ()=>{
        const rawOrderValidation = await fetch('/');
        if(rawOrderValidator.ok){
            const orderValidator = await rawOrderValidator.json();

            for(elem in orderValidator){
                if(elem == false){
                    $('#orderValid').addClass('active');
                    break;
                }
            }
        }
    }

    orderValidator();

    if($('#orderValid').hasClass('active')){
        $('#orderValid').prop("disabled", false);
        setTimeout(()=>{
            $('#orderValid').prop("disabled", true);
        }, 3000);
    }
})