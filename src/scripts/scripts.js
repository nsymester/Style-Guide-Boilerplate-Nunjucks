function countrySelector() {
  // cache DOM
  let up = document.querySelector('.country-scroller__up');
  let down = document.querySelector('.country-scroller__down');
  let items = document.querySelector('.country-scroller__items');
  let itemHeight = items.firstChild.nextSibling.offsetHeight;

  // bind events
  up.addEventListener('click', scrollUp);
  down.addEventListener('click', scrollDown);

  // event handlers
  function scrollUp() {
    // move items list up by height of li element
    items.scrollTop += itemHeight;
  }

  function scrollDown() {
    // move items list down by height of li element
    items.scrollTop -= itemHeight;
  }
}

function vehicleSelector() {
  // cache DOM
  let carTab = document.querySelector('.nav-link__car');
  let vanTab = document.querySelector('.nav-link__van');

  // bind events
  carTab.addEventListener('click', openVehicle);
  vanTab.addEventListener('click', openVehicle);

  // event handlers
  function openVehicle(evt) {
    var i, x, tabButtons;

    // hide all tab contents
    x = document.querySelectorAll('.tab-container .tab');
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }

    // remove the highlight on the tab button
    tabButtons = document.querySelectorAll('.nav-tabs .nav-link');
    for (i = 0; i < x.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }

    // highlight tab button and
    // show the selected tab content
    vehicle = this.getAttribute('data-vehicle');
    document.querySelector('.tab-' + vehicle).style.display = 'block';
    evt.currentTarget.className += ' active';
  }
}

function start() {
  countrySelector();
  vehicleSelector();
}

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(start);
