/**
 * Required Indicator for Knockout.Validation
 * Source: https://github.com/tsvetomirnik/knockout-required-indicator
 *
 * Keep using the ko.validator as you used to.
 * Just add data-bind="requiredIndicator: yourObservable" on the label in the view.
 * It will add a '.required-indicator' class when the observable has required validation rule.
 */

var main = function () {

  // Validation config
  ko.validation.init({
    insertMessages: true,
    decorateElement: true,
    errorElementClass: 'has-error',
    errorMessageClass: 'help-block'
  }, true);


  function ViewModel() {
    var self = this;

    this.isNameRequired = ko.observable(false);
    this.name = ko.observable().extend({
      required: {
        onlyIf: function () {
          return self.isNameRequired();
        }
      }
    });

    this.address = ko.observable().extend({
      required: true
    });

    // Validation
    // NOTE: Should be call after all observables
    this.errors = ko.validation.group(this);
    this.isValid = ko.computed(function () {
      return this.errors().length === 0;
    }, this);

    this.save = function () {
      alert('Successfully saved.');
    };
  }

  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
}



/* External Resources Configuration */

// RequireJS is used because of issue in the JSfiddle's external resources order
requirejs.config({
  paths: {
    'knockout': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
    'knockout.validation': 'https://cdnjs.cloudflare.com/ajax/libs/knockout-validation/2.0.3/knockout.validation',
    'knockout.requiredIndicator': 'https://rawgit.com/tsvetomirnik/knockout-required-indicator/master/ko.bindingHandler.requiredIndicator'
  }
});

require(['knockout'], function(ko) {
  window.ko = ko;
  require(['knockout.validation', 'knockout.requiredIndicator'], function(ko) {
    main();
  });
});
