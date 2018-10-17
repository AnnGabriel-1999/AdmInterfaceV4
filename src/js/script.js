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
    $('#opt-freeflow').click(function(){
        $('#freeflowOptions').css("display", "block");
        console.log('Freeflow selected');
    });

    $('#opt-segments').click(function(){
        $('#freeflowOptions').css("display", "none");
        console.log('Segments selected');
    });
    /* $('#freeflow').click(function(){
        $('#freeflowOptions').css("display", "block");
        console.log('Freeflow selected');
    });

    $('#classic').click(function(){
        $('#freeflowOptions').css("display", "none");
        console.log('Segments selected');
    });*/






    // Assigned Prof
    // $("#prof-chk__container input[type=checkbox]").each(function () {
    //     alert('Hey');
    // });



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

let tags = [];

function addTag(event, el){
    var key_press = (event.keyCode ? event.keyCode : event.which);

    let hiddenInput = document.getElementById('addQ-hidden-input'),
        mainInput = document.getElementById('addQ-main-input'),
        tagsInput = document.getElementsByClassName('tags-input')[0];     

    if (key_press == 13) {
        let tag = {
            text : mainInput.value,
            element : document.createElement('span'),
        }

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('tagClose');
        closeBtn.addEventListener('click', function(){
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        tagsInput.insertBefore(tag.element, mainInput);

        mainInput.value = "";

        refreshTags();
    }

    function removeTag(index) {
        let tag = tags[index];
        tags.splice(index, 1);
        tagsInput.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags() {
        let tagsList = [];
        tags.forEach(function(t){
            tagsList.push(t.text);
        });

        hiddenInput.value = tagsList.join(',');
    }
}







// 
// Student
// 

$(document).ready(function() {
    $('#sort-arrange').sortable();
    $('#sort-arrange').disableSelection();
});