/*!
 jQuery Validaotor plugin
 @name jquery.validator.js
 @author Mateusz Jaszewski
 @version 1.0
 @date 13/12/2014
 @category jQuery Plugin
 @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function ($) {

    $.fn.Validator = function (options) {

        defaults = {
            messages: {
                required: "To pole jest wymagane",
                checked: "Wymaga zaznaczenia.",
                email: "Proszę podać poprawny adres e-mail.",
                url: "Proszę podać podać poprawny adres www.",
                number: "Proszę podać wartość liczbową.",
                maxlength: "Proszę wpisać maksymalnie {0} znaków.",
                minlength: "Proszę wpisać co najmniej {0} znaków.",
                max: "Proszę podać wartość mniejszą lub równą {0}.",
                min: "Proszę podać wartość większą lub równą {0}.",
                pattern: "Popraw dane.",
                equal: "Wartośći pól muszą być takie same."
            },
            errorContainer: 'error',
            errorWrap: 'span',
            errorWrapClass: 'error',
            errorClass: 'error',

            success : {
                element: 'form',
                successClass: 'success'
            },

            error : {
                element: 'form',
                errorClass: 'error'
            }
        };

        options = $.extend(true, {}, defaults, options);
        form = this;

        if (options.errorWrap == '') {
            options.errorWrap = 'span';
        }

        return this.each(function () {

            function error(self, msg,  param) {
                if (param) {
                    self.after('<' + options.errorWrap + ' class="' + options.errorContainer + '" data-error>' + msg.replace('{0}', param) + '</' + options.errorWrapClass + '>')
                } else if(msg == options.messages.checked) {
                    self.parent().append('<' + options.errorWrap + ' class="' + options.errorContainer + '" data-error>' + msg.replace('{0}', param) + '</' + options.errorWrapClass + '>')
                }

                else {
                    self.after('<' + options.errorWrap + ' class="' + options.errorContainer + '" data-error>' + msg + '</' + options.errorWrapClass + '>')
                }
                self.parent().addClass(options.errorContainer);
                self.addClass(options.errorClass)
            }

            function valid() {
                var isValid = true;

                $('[data-type=url]').each(function () {
                    var self = $(this);
                    var msg = options.messages.url;
                    if (!/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test( self.val())&& self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg);
                    }
                });

                $('[data-type=email]').each(function () {
                    var self = $(this);
                    var msg = options.messages.email;

                    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( self.val()) && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg);
                    }
                });


                $('[data-type=number]').each(function () {
                    var self = $(this);
                    var msg = options.messages.number;
                    if (!/^[0-9]*[.,]?[0-9]+$/.test( self.val()) && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg);
                    }
                });


                $('[data-min]').each(function () {
                    var self = $(this);
                    var min = self.attr('data-min');
                    var num = parseFloat(self.val());
                    var msg = options.messages.min;
                    if (num < min && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false;
                        error(self, msg, min);
                    }
                });

                $('[data-max]').each(function () {
                    var self = $(this);
                    var max = self.attr('data-max');
                    var num = parseFloat(self.val());
                    var msg = options.messages.max;
                    if (num > max && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false;
                        error(self, msg, max);
                    }
                });


                $('[data-minlength]').each(function () {
                    var self = $(this);
                    var minlength = self.attr('data-minlength');
                    var msg = options.messages.minlength;
                    if (self.val().length < minlength && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg, minlength);
                    }
                });

                $('[data-maxlength]').each(function () {
                    var self = $(this);
                    var maxlength = self.attr('data-maxlength');
                    var msg = options.messages.maxlength;
                    if (self.val().length > maxlength && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg, maxlength);
                    }
                });

                $('[data-pattern]').each(function () {
                    var self = $(this);
                    var msg = options.messages.pattern;
                    var pattern = new RegExp(self.attr('data-pattern'));
                    if (!pattern.test(self.val()) && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg  );
                    }
                });

                $('[data-equal]').each(function () {
                    var self = $(this);
                    var msg = options.messages.equal;
                    var isEqual
                    var equalTo = $('#'+self.attr('data-equal'))
                    if(self.val() == equalTo.val()){
                        isEqual = true;
                    }
                    if (!isEqual && self.val() != '' && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(equalTo, msg);
                    }
                });

                $('[data-required]').each(function () {
                    var self = $(this);
                    var msg = options.messages.required;
                    if (self.val().length == 0 && self.next('[data-error]').length == 0) {
                        isValid = false
                        error(self, msg  );
                    }
                    if((self.is(':checkbox') || self.is(':radio')) &&  self.nextAll('[data-error]').length == 0){
                        if(self.is(':not(:checked)')){
                            isValid = false
                            error(self, options.messages.checked);
                        }
                    }
                });

                if (form.find('[data-error]').length > 0) {
                    return false
                } else {
                    return true
                }

            }

            $('body').on('keyup', 'form input', function (e) {
                var self = $(this);
                self.parent().removeClass(options.errorContainer);
                self.nextAll('[data-error]').remove()
            });

            $('body').on('click', 'form input[type=checkbox]', function (e) {
                var self = $(this);
                self.parent().removeClass(options.errorContainer);
                self.nextAll('[data-error]').remove()
            });

            $('body').on('click', '[type="submit"]', function (e) {
                e.preventDefault();
                if (valid()) {
                    $(options.success.element).addClass(options.success.successClass)
                    $(options.error.element).removeClass(options.error.errorClass)
                } else {
                    $(options.error.element).addClass(options.error.errorClass)
                }
            })
        });
    };


})(jQuery);