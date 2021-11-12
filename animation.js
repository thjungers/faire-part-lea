'use strict'

window.onload = function() {
    /* ScrollMagic controller */

    document.body.addEventListener("click", function() {
        let elem = document.querySelector("#env-wrapper");

        elem.requestFullscreen = elem.requestFullscreen || elem.mozRequestFullscreen
            || elem.msRequestFullscreen || elem.webkitRequestFullscreen;

        elem.requestFullScreen();
        screen.orientation.lock("portrait-primary");
    }, false);

    let controller = new ScrollMagic.Controller()

    /* scroll tip */

    let scroll_anim = anime({
        targets: '#scroll-tip-text, #scroll-tip-arrows use',
        translateY: [
            {
                value: '+=.5vmin',
                easing: 'easeInOutBack',
                delay: anime.stagger(100)
            },
            {
                value: '-=.5vmin',
                easing: 'easeInOutSine',
                delay: anime.stagger(-100, {start: 1000})
            }
        ],
        endDelay: 1000,
        loop: true
    })

    let scroll_hide = anime({
        targets: '#scroll-tip-text, #scroll-tip-arrows use',
        autoplay: false,
        opacity: 0,
        duration: 2000,
        complete: function(anim) {
            document.querySelector('#scroll-tip').style.display = 'none'
            scroll_anim.pause()
        }
    })

    /* rotate overlay */

    let rotate_anim = anime({
        targets: '#rotate-overlay-devices img',
        loop: true,
        easing: 'easeInOutSine',
        opacity: [
            {
                value: 1,
                delay: anime.stagger(5000),
                endDelay: 2000
            },
            {
                value: 0,
                delay: 1000,
                endDelay: 1000
            }
        ],
        rotate: [
            {
                value: '90deg',
                delay: anime.stagger(5000, {start: 1000}),
                endDelay: 2000
            },
            {
                value: '0deg',
                delay: 1000
            }
        ]
    })

    /* open envelope */

    let tl1 = anime.timeline({
        easing: 'easeInOutSine',
        duration: 1000,
        autoplay: false
    })
    // open flap...
    .add({
        targets: '#env-flap, #seal',
        rotateX: '180deg'
    })
    // ... and put the seal behind the card half-way...
    .add({
        targets: '#seal',
        zIndex: -10,
        duration: 1
    }, '-=525')
    // ... then put the flap behind the card
    .add({
        targets: '#env-flap',
        zIndex: 0,
        duration: 1
    })
    // move the card up...
    .add({
        targets: '#card',
        translateY: '-100%'
    })
    // ... then down (= going slightly up relative to the envelope) and a bit scaled up...
    .add({
        targets: '#card',
        translateY: '-120%',
        scale: 1.08,
    })
    // ... while the envelope goes down...
    .add({
        targets: '#envelope',
        translateY: '100%',
        duration: 2000,
    }, '-=2000')
    // ... and put the card above it
    .add({
        targets: '#card',
        zIndex: 50,
        duration: 1
    })
    // open the left card flap...
    .add({
        targets: '#card-left',
        rotateY: ['360deg', '180deg'],
        delay: 500
    })
    // ... and the right flap
    .add({
        targets: '#card-right',
        rotateY: ['0deg', '180deg'],
        endDelay: 1000
    }, '-=1000')

    /* hide the scroll-tip and bind the timeline to ScrollMagic */

    let scene1 = new ScrollMagic.Scene({
        triggerElement: '#env-wrapper',
        duration: 3000,
        triggerHook: 0
    })
    .on('progress', function(event) {
        if(event.progress > 0.05) {
            scroll_hide.play()
        }
        tl1.seek(tl1.duration * event.progress)
    })
    .setPin('#env-wrapper')
    .addTo(controller)
}