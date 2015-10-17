
var EventManager = function(etageManager, trajetManager) {

  this.isSelected = false;
  this.selectedEtage = 0;
  this.radios = [];
  this.slider = null;

  this.setup = function() {
    this.setupSlider();
  };

  this.run = function() {
    this.radioButton();
    this.sliderManager();
  };

  //SLIDER
  this.setupSlider = function() {
    var sizeSlider = trajetManager.getSize();
    this.slider = createSlider(0, sizeSlider, sizeSlider);
  };
  this.sliderManager = function() {
    var sliderValue = this.slider.value();
    trajetManager.setSliderValue(sliderValue);
  };

  //RADIO BUTTONS
  this.radioButton = function() {

    var elt = $("checkbox");
    var radioValues = elt.children();

    for (var i = 0; i < radioValues.length; i++) {
      var radioValue = radioValues[i];
      if (radioValue.checked) {
        this.radios[i] = 1;
      } else {
        this.radios[i] = 0;
      }
    };

    var noneSelected = true;

    for (var i = 0; i < radioValues.length - 1; i++) {
      if (this.radios[i] == 1) {
        trajetManager.setAllStateByFloor(2, i);
        etageManager.setState(1, i);
        noneSelected = false;
      } else {
        trajetManager.setAllStateByFloor(0, i);
        etageManager.setState(0, i);
      }
    };

    if (noneSelected) {
      for (var i = 0; i < radioValues.length - 1; i++) {
        trajetManager.setAllStateByFloor(1, i);
        etageManager.setState(1, i);
      };
    }

  };
};