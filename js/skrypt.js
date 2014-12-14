/**
 * Created by mati on 2014-12-13.
 */
$(document).ready(function(){
    $('form').Validator({
        errorContainer: 'has-error has-feedback',
        errorContainer: 'error',
        errorWrap: 'span',
        errorWrapClass: 'error',
        messages: {
            required : 'Wypełnij to pole'
        },
        success : {
            element: '.panel',
            successClass: 'panel-success'
        }
    }).addClass('fdf');
})