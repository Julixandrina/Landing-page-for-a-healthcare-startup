'use strict'

let swiper = new Swiper('.swiper-container', {
    cssMode: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    mousewheel: true,
    keyboard: true,
});


let isMenuTransitioning = false;

document.querySelector('[data-target="#navbarToggleExternalContent"]').addEventListener('click', function (event) {
    let btn = this;

    let navbarMenuContent = document.querySelector('#navbarToggleExternalContent');

    if(btn.classList.contains('collapsed')){
        menuOpen(navbarMenuContent, btn)
    } else {
        menuClose(navbarMenuContent, btn)
    }
})

function menuOpen(navbarMenuContent, btn) {
    if(isMenuTransitioning){
        return;
    }
    navbarMenuContent.classList.toggle('collapse', false);
    navbarMenuContent.classList.toggle('collapsing', true);
    navbarMenuContent.style.height = 0;

    isMenuTransitioning = true;

    navbarMenuContent.addEventListener('transitionend', function () {
        navbarMenuContent.classList.toggle('collapsing', false);
        navbarMenuContent.classList.toggle('collapse', true);
        navbarMenuContent.classList.toggle('show', true);
        navbarMenuContent.style.height = '';

        btn.classList.toggle('collapsed', false);

        isMenuTransitioning = false;
    }, { once: true });

    navbarMenuContent.style.height = `${navbarMenuContent.scrollHeight}px`;
}

function menuClose(navbarMenuContent, btn) {
    if(isMenuTransitioning ){
        return;
    }
    let needHeight = `${navbarMenuContent.getBoundingClientRect().height}px`;
    navbarMenuContent.style.height = needHeight;

    navbarMenuContent.offsetHeight;

    navbarMenuContent.classList.toggle('collapsing', true);
    navbarMenuContent.classList.toggle('collapse', false);
    navbarMenuContent.classList.toggle('show', false);

    isMenuTransitioning = true;

    navbarMenuContent.addEventListener('transitionend', function () {
        navbarMenuContent.classList.toggle('collapsing', false);
        navbarMenuContent.classList.toggle('collapse', true);

        btn.classList.toggle('collapsed', true);

        isMenuTransitioning = false;
    }, { once: true });

    navbarMenuContent.style.height = '';
}