var aboutEl = document.getElementById('about');
var skillsEl = document.getElementById('skills');
var projectsEl = document.getElementById('projects');
var links = document.querySelectorAll('header nav ul li a');
var linkIndex = 0;

var OFFSET = 50;
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
    if (sy > projectsEl.offsetTop - OFFSET && sy < (projectsEl.offsetTop + projectsEl.scrollHeight - OFFSET)) {
        linkIndex = 2;
    } else if (sy > skillsEl.offsetTop - OFFSET && sy < (skillsEl.offsetTop + skillsEl.scrollHeight - OFFSET)) {
        linkIndex = 1;
    } else if (sy > aboutEl.offsetTop - OFFSET && sy < (aboutEl.offsetTop + aboutEl.scrollHeight - OFFSET)) {
        linkIndex = 0;
    }

    toggleClass();
}

changeActiveLink();
document.addEventListener('scroll', changeActiveLink);