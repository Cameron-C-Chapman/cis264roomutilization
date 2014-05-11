'use strict';
//@TODO tests need drastically expanded

/* jasmine specs for controllers go here */

describe('Controllers', function(){
    beforeEach(module('cis264App'));

    it('MainCtrl should be defined...', inject(function($controller) {
        //spec body
        var MainCtrl = $controller('MainCtrl', { $scope: {} });
        expect(MainCtrl).toBeDefined();
    }));

    /*
    //@TODO the DatepickerCtrl can't be tested because it uses $scope.watch. This is not unit testable and there needs to be a work around to fix this.
    it('DatepickerCtrl should be defined...', inject(function($controller) {
        //spec body
        var DatepickerCtrl = $controller('DatepickerCtrl', { $scope: {} });
        expect(DatepickerCtrl).toBeDefined();
    }));

  //@TODO the DatepickerCtrl can't be tested because it uses $scope.watch. This is not unit testable and there needs to be a work around to fix this.
    it('TimepickerCtrl should be defined...', inject(function($controller) {
        //spec body
        var TimepickerCtrl = $controller('TimepickerCtrl', { $scope: {} });
        expect(TimepickerCtrl).toBeDefined();
    }));
    */

    it('DocsCtrl should be defined...', inject(function($controller) {
      //spec body
      var DocsCtrl = $controller('DocsCtrl', { $scope: {} });
      expect(DocsCtrl).toBeDefined();
    }));

});