var aboutEl = document.getElementById('about');
var skillsEl = document.getElementById('skills');
var projectsEl = document.getElementById('projects');
var contactsEl = document.getElementById('contact');
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
    if (isWithinEl(contactsEl, sy)) {
        linkIndex = 3;
    } else if (isWithinEl(projectsEl, sy)) {
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

// E-mail Clipboard
var emailAddressInput = document.getElementById('email-address');

function copyEmailAddress() {
    var btn = document.querySelector('.copy-button');
    var emailAddress = emailAddressInput.attributes.value.value;
    emailAddressInput.focus();
    emailAddressInput.select();
    var oldInnerHTML = btn.innerHTML;

    navigator.clipboard.writeText(emailAddress)
        .then(function () {
            btn.innerHTML = 'Copied!'
            btn.setAttribute('disabled', '');
        })
        .catch(function (err) {
            console.error(err);
            btn.innerHTML = 'Copied!'
            btn.setAttribute('disabled', '');
        })
        .finally(function () {
            setTimeout(function() {
                btn.removeAttribute('disabled');
                btn.innerHTML = oldInnerHTML;
                emailAddressInput.blur();
            }, 2000);
        });
}