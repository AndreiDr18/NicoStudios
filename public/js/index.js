$(document).ready(()=>{
    $('#orderValid').disabled = true;
            for(elem in ){
                if(elem == false){
                    $('#orderValid').addClass('active');
                    break;
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