$(document).ready(function(){
    $("#chk-newsid").change(function(){
        $("#lalala").toggleClass("d-none");
    });

    $('#sectionModalEdit').on('shown.bs.modal', function(event){
        var button = $(event.relatedTarget);
        var section = button.data('section');
        
        var modal = $(this);
        modal.find('.modal-body input#sectionName').val(section);
    });

    function showTxtRemaining() {
        var text_max = 250;
        $('#text_feedback').text(text_max).css("display","block");
        $('#text_title').keyup(function(){
            var text_length = $('#text_title').val().length;
            var text_remaining = text_max - text_length;
            
            $('#text_feedback').text(text_remaining);
        });
    }
    
    function hideMe(elemToHide) {
        $(elemToHide).css("display", "none");
    }

    $('.opt-quizMode:first-child').click(function(){
        $('#opt-segments').removeAttr("selected");
        $('#opt-freeflow').attr("selected", "selected");
        $('#freeflowOptions').css("display", "block");
        console.log('Freeflow selected');
    });

    $('.opt-quizMode:last-child').click(function(){
        $('#opt-freeflow').removeAttr("selected");
        $('#opt-segments').attr("selected", "selected");
        $('#freeflowOptions').css("display", "none");
        console.log('Segments selected');
    });

});

// function showTxtRemaining(elemToLimit, elemFeedback, maxInput) {
//     var text_max = maxInput;
//     $('#text_feedback').text(text_max).css("display","block");
//     $('#text_title').keyup(function(){
//         var text_length = $('#text_title').val().length;
//         var text_remaining = text_max - text_length;
        
//         $('#text_feedback').text(text_remaining);
//     });
// }