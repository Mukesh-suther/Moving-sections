window.addEventListener("load", function() {
    document.getElementById('main').style.transition = 'opacity 0.5s';
    document.getElementById('main').style.opacity = '1';
    setTimeout(function() {
        document.querySelector('.loader-holder').classList.add('none')
        document.querySelector('.loader-holder').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader-holder').style.display = 'none';
        }, 500);
    }, 500);
});

function initGroovi() {
    // Your date ------------------
    new DownCount(document.querySelector(".countdown"), "09/12/2023", 0);
    // Swiper ------------------
    var swiper = new Swiper(".swiper-container", {
        speed: 1500,
        keyboard: {
            enabled: true
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 120,
            depth: 2100
        },
        initialSlide: 1,
        grabCursor: true,
        on: {
            slideChange: function() {
                document.querySelector("#menu .active").classList.remove("active");
                document.querySelectorAll("#menu a")[swiper.activeIndex].classList.add("active");
            }
        }
    });

    document.querySelector(".go-contact").addEventListener("click", function(event) {
        event.preventDefault();
        swiper.slideTo(2);
    });

    document.querySelector(".arrow-left").addEventListener("click", function(event) {
        event.preventDefault();
        swiper.slidePrev();
    });

    document.querySelector(".arrow-right").addEventListener("click", function(event) {
        event.preventDefault();
        swiper.slideNext();
    });

    // Menu ------------------
    document.querySelectorAll("#menu a").forEach(function(anchor) {
        anchor.addEventListener("mousedown", function(event) {
            event.preventDefault();
            document.querySelector("#menu .active").classList.remove("active");
            anchor.classList.add("active");
            swiper.slideTo(Array.from(anchor.parentNode.children).indexOf(anchor));
            setTimeout(hideMenu, 1750);
        });
    });

    function showMenu() {
        document.getElementById("nav").classList.remove("vis");
        document.querySelector('.wrapper').classList.add('vis-menu');
        document.querySelector('.nav-button').classList.add('cmenu');
        document.querySelectorAll(".elem").forEach(function(elem) {
            elem.style.display = 'block';
        });
        setTimeout(function() {
            document.querySelectorAll(".elem-anim").forEach(function(elem, index) {
                setTimeout(function() {
                    elem.style.transition = 'opacity 0.6s ease-out, margin-top 0.6s ease-out';
                    elem.style.opacity = '1';
                    elem.style.marginTop = '0';
                }, 150 * index);
            });
        }, 650);
    }

    function hideMenu() {
        document.getElementById("nav").classList.add("vis");
        document.querySelector('.nav-button').classList.remove('cmenu');
        document.querySelectorAll(".elem-anim").forEach(function(elem, index) {
            setTimeout(function() {
                elem.style.transition = 'opacity 0.6s ease-out, margin-top 0.6s ease-out';
                elem.style.opacity = '0';
                elem.style.marginTop = '-150px';
            }, 150 * index);
        });
        setTimeout(function() {
            document.querySelectorAll(".elem").forEach(function(elem) {
                elem.style.display = 'none';
            });
            document.querySelector('.wrapper').classList.remove('vis-menu');
        }, 650);
    }

    document.querySelector(".nav-button").addEventListener("click", function() {
        if (document.getElementById("nav").classList.contains("vis")) {
            showMenu();
        } else {
            hideMenu();
        }
        return false;
    });

    // Contact form ------------------
    document.getElementById("contactform").addEventListener("submit", function(event) {
        event.preventDefault();
        var form = event.target;
        var action = form.action;
        var message = document.getElementById("message");
        var submitButton = document.getElementById("submit");
        message.style.display = 'none';
        submitButton.disabled = true;

        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", action, true);
        xhr.onload = function() {
            message.innerHTML = xhr.responseText;
            message.style.display = 'block';
            submitButton.disabled = false;
            if (xhr.responseText.includes("success")) {
                form.style.display = 'block';
            }
        };
        xhr.send(formData);
    });

    document.querySelectorAll("#contactform input, #contactform textarea").forEach(function(input) {
        input.addEventListener("keyup", function() {
            document.getElementById("message").style.display = 'none';
        });
    });

    document.querySelector('.show-form').addEventListener("click", function() {
        document.querySelector('.hide-con-info').classList.add('vis-form');
        document.querySelector('.contact-form-holder').classList.add('vis-form2');
    });

    document.querySelector('.close-form').addEventListener("click", function() {
        document.querySelector('.hide-con-info').classList.remove('vis-form');
        document.querySelector('.contact-form-holder').classList.remove('vis-form2');
    });

    // Responsive video ------------------
    function adjustVideoSize() {
        var videoHolder = document.querySelector(".video-holder");
        var mediaContainer = document.querySelector(".media-container");
        videoHolder.style.height = mediaContainer.offsetHeight + 'px';
        var iframe = document.querySelector("iframe, #player");
        if (window.innerWidth > 1024) {
            if ((mediaContainer.offsetHeight + 150) / 9 * 16 > mediaContainer.offsetWidth) {
                iframe.style.height = (mediaContainer.offsetHeight + 150) + 'px';
                iframe.style.width = ((mediaContainer.offsetHeight + 150) / 9 * 16) + 'px';
                iframe.style.marginLeft = (-iframe.offsetWidth / 2) + 'px';
                iframe.style.top = '-75px';
                iframe.style.marginTop = '0px';
            } else {
                iframe.style.width = window.innerWidth + 'px';
                iframe.style.height = (window.innerWidth / 16 * 9) + 'px';
                iframe.style.marginLeft = (-iframe.offsetWidth / 2) + 'px';
                iframe.style.marginTop = (-iframe.offsetHeight / 2) + 'px';
                iframe.style.top = '50%';
            }
        } else if (window.innerWidth < 760) {
            videoHolder.style.height = mediaContainer.offsetHeight + 'px';
            iframe.style.height = mediaContainer.offsetHeight + 'px';
        } else {
            videoHolder.style.height = mediaContainer.offsetHeight + 'px';
            iframe.style.height = mediaContainer.offsetHeight + 'px';
        }
    }

    adjustVideoSize();
    window.addEventListener('resize', adjustVideoSize);
}

//=============== subscribe form ==============
(function() {
    function handleSubscribe(event) {
        event.preventDefault();
        var form = event.target;
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    alert('We will be in touch soon!');
                } else {
                    alert('You must enter a valid e-mail address.');
                }
            }
        };
        var formData = new FormData(form);
        var params = new URLSearchParams();
        for (var pair of formData.entries()) {
            params.append(pair[0], pair[1]);
        }
        xhr.send(params);
    }

    var subscribeForm = document.getElementById('subscribe');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscribe);
    }
})();

var playing = true;
// document.getElementById('audio-control').addEventListener("click", function() {
//     var player = document.getElementById('player');
//     if (playing === false) {
//         player.play();
//         playing = true;
//         this.classList.remove('as');
//     } else {
//         player.pause();
//         playing = false;
//         this.classList.add('as');
//     }
// });

// if mobile------------------
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var trueMobile = isMobile.any();

if (trueMobile) {
    document.querySelectorAll("iframe, #player").forEach(function(elem) {
        elem.remove();
    });
}

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// init functions ------------------
document.addEventListener("DOMContentLoaded", function() {
    initGroovi();
});

// DownCount function needs to be implemented or included as it's a custom function in the original code
function DownCount(elem, date, offset) {
    // DownCount implementation goes here
}

