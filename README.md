# Required Indicator for Knockout.Validation

Binding handler for [Knockout.Validation](
https://github.com/Knockout-Contrib/Knockout-Validation) to add required indicator for observables with requred validation rule.

## Configuration

```javascript
// Global configuration
ko.bindingHandlers.requiredIndicator.defaults.indicatorClass = 'required-indicator';
```

## Example

[jsfiddle](http://jsfiddle.net/tsvetomirnik/eqnptfuh/)

### View Model

```javascript

this.address = ko.observable().extend({
  required: true
});

// [Conditional Validation](https://github.com/Knockout-Contrib/Knockout-Validation/wiki/Conditional-Validation)
this.isNameRequired = ko.observable(false);
this.name = ko.observable().extend({
  required: {
    onlyIf: function () { return self.isNameRequired(); }
  }
});
```

### View

```html
<div class="form-group" data-bind="validationElement: name">
  <label class="control-label" data-bind="requiredIndicator: name">Name</label>
  <input type="text" data-bind="value: name" class="form-control" />
</div>
<div class="checkbox">
  <label>
    <input type="checkbox" data-bind="checked: isRequired" /> Is Required
  </label>
</div>
```
