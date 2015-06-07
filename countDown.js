(function() {
  'use strict';

  var countDown = Object.create( HTMLElement.prototype );
  countDown.createdCallback = function() {
    this.getAttributesData();
    this.innerHTML = 
      '<div class="timer_container"></div>' +
        '<div class="timer_seconds"></div>' +
      '</div>';

    this.secondsElement = this.querySelector( ".timer_seconds" );

    this.updateTimer();

    setInterval(function() {
      this.updateTimer();
    }, 1000);
  };

  countDown.getAttributesData = function() {
    this.year = this.getAttribute("year");
    this.month = this.getAttribute("month");
    this.day = this.getAttribute("day");
  };

  countDown.updateTimer = function() {
  };

  countDown.attributesChangedCallback = function() {

  };

  document.registerElement('count-down', { 
    prototype: countDown
  });
})();
