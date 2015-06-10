var counter = (function() {
  'use strict';

  var counter = Object.create( HTMLElement.prototype );
  counter.createdCallback = function() {
    this.getAttributesData();

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
    this.startDate = !this.getAttribute('start-date') ? new Date() : new Date( this.getAttribute('start-date') ); //get current time in seconds if no input;
    this.type = !this.getAttribute('type') ? 'timer' : this.getAttribute('type'); //set type to timer if no input
  };

  counter.updateTimerElement = function() {
    if(this.type === 'timer') {
      var currentDate = (new Date()).getSeconds() - this.startDate.getSeconds();
      this.secondsElement.innerHTML = currentDate;
    } else if(this.type === 'stopwatch') {    
      var timeLeft = ( this.endDate.getTime() - (new Date()).getTime() ) / 1000;
      timeLeft = timeLeft < 0 ? 0 : timeLeft; 
      timeLeft = timeLeft.toString().indexOf('.') !== -1 ? timeLeft.toString().split('.')[0] : timeLeft;
      this.secondsElement.innerHTML = timeLeft;
    }
  };

  counter.attributeChangedCallback = function(attr, oldVal, newVal) {
    if(/type|start-end|end-date/.test(attr)) {
      this.getAttributesData();
      this.updateTimerElement();
    }
  };

  document.registerElement('counter-component', { 
    prototype: counter 
  });


  return {
    /**
     * It will change attr with value passed and add attr if it doesn't exist
     */
    setAttr: function(name, value) {
    var counter = document.querySelector('counter-component');
    counter.setAttribute(name, value);
  }
  };

})();
