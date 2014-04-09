'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('cis264App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('errorState = false', function () {
    expect(scope.errorState).toBe(false);
  });
});
