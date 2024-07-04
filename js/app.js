'use strict';
// ============  Header Menu
const menuBtn = document.getElementById('nav-toggler-btn');
const menuContent = document.getElementById('header-menu');
const navLinks = document.querySelectorAll('.header__menu-link');
const navBtn = document.querySelector('.btn-nav');

menuBtn.addEventListener('click', toggleMenu);
navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});
navBtn.addEventListener('click', closeMenu, false);

function toggleMenu() {
  menuBtn.classList.toggle('open');
  const isActive = menuBtn.classList.contains('open');

  if (isActive) {
    menuContent.style.maxHeight = menuContent.scrollHeight + 'px';
  } else {
    menuContent.style.maxHeight = null;
  }
}
function closeMenu() {
  menuBtn.classList.remove('open');
  menuContent.style.maxHeight = null;
}

// Show & Hide Button Scroll to Top
// const btnUp = document.querySelector('.btn-up');
const header = document.querySelector('.header');
window.onscroll = function () {
  const windowHeight = window.innerHeight;

  // if (window.scrollY > 2 * windowHeight) {
  //     btnUp.classList.add('show');
  // } else {
  //     btnUp.classList.remove('show');
  // }

  if (window.scrollY >= 20) {
    header.classList.add('expand');
  } else {
    header.classList.remove('expand');
  }
};

// ==================== Counter
const workshopSection = document.getElementById('workshop');
const counters = document.querySelectorAll('.workshop__card-count');
const speed = 200;

const startCounter = (counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.textContent;
    const inc = target / speed;

    if (count < target) {
      counter.textContent = Math.ceil(count + inc);
      setTimeout(updateCount, 8);
    } else {
      counter.textContent = target + '+';
    }
  };

  updateCount();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => startCounter(counter));
        observer.unobserve(workshopSection);
      }
    });
  },
  { threshold: 0.25 }
);

observer.observe(workshopSection);

// ===================== Timer
const items = document.querySelectorAll('.timer__item-time');

const dateString = '2024-09-13 12:00:00 GMT+0800';
const [datePart, timePart, timeZone] = dateString.split(' ');
const [year, month, day] = datePart.split('-').map(Number);
const [hours, minutes, seconds] = timePart.split(':').map(Number);
const timeZoneOffset = timeZone.slice(3);

// Calculate the time zone offset in minutes
const offsetSign = timeZoneOffset[0] === '+' ? 1 : -1;
const offsetHours = parseInt(timeZoneOffset.slice(1, 3), 10);
const offsetMinutes = parseInt(timeZoneOffset.slice(3, 5), 10);
const totalOffsetMinutes = offsetSign * (offsetHours * 60 + offsetMinutes);

// Create the date object in UTC
const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

// Adjust the date object by the time zone offset
const futureDate = new Date(utcDate.getTime() - totalOffsetMinutes * 60 * 1000);

const oneHour = 60 * 60 * 1000;

//Future Time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;
  let day = Math.floor(t / oneDay);
  let hour = Math.floor((t % oneDay) / oneHour);
  let minute = Math.floor((t % oneHour) / oneMinute);
  let second = Math.floor((t % oneMinute) / oneSecond);

  const val = [day, hour, minute, second];
  // if value is less than 10 then throw 0 before the value
  function format(item) {
    if (item < 10) {
      return `0${item}`;
    } else {
      return item;
    }
  }

  //Displaying in the DOM
  items.forEach(function (item, index) {
    if (t > 1) {
      item.innerHTML = format(val[index]);
    } else {
      item.innerHTML = '00';
    }
  });

  if (t < 1) {
    clearInterval(countdown);
  }
}

//Countdown
let countdown = setInterval(getRemainingTime, 1000);
//invoking the function after interval
getRemainingTime();
