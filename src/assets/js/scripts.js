(function ($) {
    "use strict";

    var mobileMenu = function () {

        var navWrap = $('.header-nav-wrap'),
            closeNavWrap = navWrap.find('.header-overlay-close'),
            menuToggle = $('.header-toggle-menu'),
            siteBody = $('body');

        menuToggle.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            siteBody.addClass('nav-wrap-is-visible');
        });

        closeNavWrap.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            siteBody.removeClass('nav-wrap-is-visible');
        });

    };

    /* INIT */
    $(function () {
        mobileMenu();
    });

})(jQuery);
