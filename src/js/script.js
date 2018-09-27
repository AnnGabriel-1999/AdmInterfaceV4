$(document).ready(function(){
    console.log('The DOM is ready');

    $("#chk-newsid").change(function(){
        $("#lalala").toggleClass("d-none");
    });

    $('#sectionModalEdit').on('shown.bs.modal', function(event){
        var button = $(event.relatedTarget);
        var section = button.data('section');
        
        var modal = $(this);
        modal.find('.modal-body input#sectionName').val(section);
    });

    // Quiz Mode option
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

// Text remaining counter
function showTxtRemaining(elemToCount, textFeedback, textLimit) {
    console.log('Text remaining will be displayed', elemToCount, textFeedback, textLimit);
    $(textFeedback).text(textLimit).css("display","block");
    $(elemToCount).keyup(function(){
        var text_length = $(elemToCount).val().length;
        var text_remaining = textLimit - text_length;
        
        $(textFeedback).text(text_remaining);
    });
}

function hideMe(elemToHide) {
    $(elemToHide).css("display", "none");
}