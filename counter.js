(function() {
  'use strict';

  var counter = Object.create( HTMLElement.prototype );
  counter.createdCallback = function() {
    this.getAttributesData();
    this.currentDate = this.startDate;
    this.innerHTML = 
      '<div class="timer_container">' +
        '<div class="timer_seconds"></div>' +
      '</div>';

    this.secondsElement = this.querySelector('.timer_seconds');

    this.updateTimerElement();

    setInterval(function() {
      this.updateTimerElement();
    }.bind(this), 1000);
  };

  counter.getAttributesData = function() {
    /**
     * end-date(any format accepted by Date constructor): 
     * start-date(any format accepted by Date constructor): 
     * type: timer(default), stopwatch 
     */
    this.endDate = new Date(this.getAttribute('end-date') );
    this.startDate = !this.getAttribute('start-date') ? new Date() : new Date( this.getAttribute('start-date') ); //get current time in seconds;
    this.type = !this.getAttribute('type') ? 'timer' : this.getAttribute('type');
  };

  counter.updateTimerElement = function() {
    if(this.type === 'timer') {
      this.currentDate.setSeconds(this.currentDate.getSeconds() + 1);
      this.secondsElement.innerHTML = this.currentDate;
    } else if(this.type === 'stopwatch') {
      this.currentDate.setSeconds(this.currentDate.getSeconds() - 1);
      this.secondsElement.innerHTML = this.currentDate;
    }
  };

  counter.attributesChangedCallback = function() {

  };

  document.registerElement('counter-component', { 
    prototype: counter 
  });
})();
