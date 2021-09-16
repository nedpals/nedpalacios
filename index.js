var aboutEl = document.getElementById('about');
var skillsEl = document.getElementById('skills');
var projectsEl = document.getElementById('projects');
var links = document.querySelectorAll('header nav ul li a');
var linkIndex = 0;

var OFFSET = 85;
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

function isWithinEl(el, sy) {
    return sy > el.offsetTop - OFFSET && sy < (el.offsetTop + el.scrollHeight - OFFSET);
}

function changeActiveLink() {
    var sy = window.scrollY;
    if (isWithinEl(projectsEl, sy)) {
        linkIndex = 2;
    } else if (isWithinEl(skillsEl, sy)) {
        linkIndex = 1;
    } else if (isWithinEl(aboutEl, sy)) {
        linkIndex = 0;
    } else {
        linkIndex = -1;
    }

    toggleClass();
}

changeActiveLink();
document.addEventListener('scroll', changeActiveLink);