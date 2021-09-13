var bioAndHealthEl = document.getElementById('bio_and_health');
var learningEl = document.getElementById('learning');
var smartIotEl = document.getElementById('smart_iot');
var links = document.querySelectorAll('header nav ul li a');
var linkIndex = 0;

var OFFSET = 300;
var ACTIVE_CLASS = 'active';

function toggleClass() {
    links.forEach(function (el, i) {
        if (i !== linkIndex && el.classList.contains(ACTIVE_CLASS)) {
            el.classList.remove(ACTIVE_CLASS);
        } else if (i == linkIndex && !links[linkIndex].classList.contains('active')) {
            links[linkIndex].classList.add(ACTIVE_CLASS);
        }
    });
}

function changeActiveLink(ev) {
    var sy = window.scrollY;
    if (sy > smartIotEl.offsetTop - OFFSET && sy < (smartIotEl.offsetTop + smartIotEl.scrollHeight - OFFSET)) {
        linkIndex = 2;
    } else if (sy > learningEl.offsetTop - OFFSET && sy < (learningEl.offsetTop + learningEl.scrollHeight - OFFSET)) {
        linkIndex = 1;
    } else if (sy > bioAndHealthEl.offsetTop - OFFSET && sy < (bioAndHealthEl.offsetTop + bioAndHealthEl.scrollHeight - OFFSET)) {
        linkIndex = 0;
    }

    toggleClass();
}

changeActiveLink();
document.addEventListener('scroll', changeActiveLink);