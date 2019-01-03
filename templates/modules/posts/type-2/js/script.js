(function($) {
    $(document).ready(function() {
        $('.M--posts.type--2').find('.posts__list').owlCarousel({
            nav: true,
            navContainerClass: 'posts__nav',
            navClass: ['nav__button nav__prev', 'nav__button nav__next'],
            navText: ['<i class="material-icons">navigate_before</i>', '<i class="material-icons">navigate_next</i>'],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });
    });
})(jQuery);