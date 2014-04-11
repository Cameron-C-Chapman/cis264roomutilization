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

  it('MainCtrl should not be null', function () {
    expect(MainCtrl).not.toBe(null);
  });

  it('scope should not be null', function () {
    expect(scope).not.toBe(null);
  });

  it('scope.errorState should not be null', function () {
    expect(scope.errorState).not.toBe(null);
  });

  it('scope.errorState should be initiated to false', function () {
    expect(scope.errorState).toBe(false);
  });

  it('scope.showImageView should not be null', function () {
    expect(scope.showImageView).not.toBe(null);
  });

  it('scope.showImageView should be initiated to true', function () {
    expect(scope.showImageView).toBe(true);
  });

});