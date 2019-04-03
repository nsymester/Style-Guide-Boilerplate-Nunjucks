function greetings() {
  // cache DOM
  let greet = document.querySelector('.greet');
  let message = document.querySelector('.message');

  // bind events
  greet.addEventListener('click', greeter);

  // event handlers
  function greeter() {
    message.innerHTML = '';
    let world = document.createElement('P');
    world.innerHTML = 'HELLO WORLD!!';
    message.appendChild(world);
  }
}

function start() {
  greetings();
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
