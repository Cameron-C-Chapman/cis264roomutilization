'use strict';

/* jasmine specs for controllers go here */

describe('Controllers', function(){
    beforeEach(module('cis264App'));

    it('MainCtrl should be defined...', inject(function($controller) {
        //spec body
        var MainCtrl = $controller('MainCtrl', { $scope: {} });
        expect(MainCtrl).toBeDefined();
    }));

    it('DatepickerCtrl should be defined...', inject(function($controller) {
        //spec body
        var DatepickerCtrl = $controller('DatepickerCtrl', { $scope: {} });
        expect(DatepickerCtrl).toBeDefined();
    }));

    it('TimepickerCtrl should be defined...', inject(function($controller) {
        //spec body
        var TimepickerCtrl = $controller('TimepickerCtrl', { $scope: {} });
        expect(TimepickerCtrl).toBeDefined();
    }));

});