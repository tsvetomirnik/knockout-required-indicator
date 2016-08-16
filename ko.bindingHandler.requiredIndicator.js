(function() {
  'use strict';

  // Requires
  if (ko === undefined || ko.validation === undefined) {
    throw new Error('Knockout-Validation library required.');
  }

  /**
   * Required Indicator Binding
   * @example <label class="control-label" data-bind="requiredIndicator: name">Name</label>
   */
  ko.bindingHandlers.requiredIndicator = {
    defaultOptions: {
      indicatorClass: 'required-indicator',
    },
    setOptions: function(options) {
      var self = ko.bindingHandlers.requiredIndicator;
      self.options = self.defaultOptions;
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          self.options[key] = options[key];
        }
      }
    },
    update: function(element, valueAccessor, allBindings) {
      var self = ko.bindingHandlers.requiredIndicator,
        value = valueAccessor(),
        rules = value.rules() || [],
        isRequired = false;

      self.setOptions(allBindings.get('requiredIndicatorOptions'));

      if (value() instanceof Array) {
        isRequired = self._hasRequredRulesForArray(rules);
      } else {
        isRequired = self._hasRequredRulesForValue(rules);
      }

      if (isRequired) {
      	element.classList.add(self.options.indicatorClass);
      } else {
      	element.classList.remove(self.options.indicatorClass);
      }
    },
    _hasRequredRulesForValue: function(rules) {
      var isRequired = false,
        requiredRule;
        
      requiredRule = rules.map(function(item) {
        if (item.rule === 'required') {
          return item;
        }
      })[0];

      if (requiredRule) {
        if (requiredRule.condition) {
          isRequired = requiredRule.condition();
        } else {
          isRequired = requiredRule.params === true;
        }
      }
      return isRequired;
    },
    _hasRequredRulesForArray: function(rules) {
      var isRequired = false,
        minLengthRule;
        
      minLengthRule = rules.map(function(item) {
        if (item.rule === 'minLength') {
          return item;
        }
      })[0];

      if (minLengthRule) {
        if (minLengthRule.condition) {
          isRequired = minLengthRule.condition();
        } else {
          isRequired = minLengthRule.params > 0;
        }
      }
      return isRequired;
    }
  };

}());
