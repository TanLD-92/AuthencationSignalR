(function () {
    'use strict';

    angular
        .module('home.module')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', 'homeService', '$rootScope', '$scope'];

    function HomeController($location, homeService, $rootScope, $scope) {
        /* jshint validthis:true */
        var seft = this;
        seft.register = register;

        //register 
        function register(form) {
            if (form.$valid) {
                var registerData = {
                    userName: seft.userName,
                    passWord: seft.passWord,
                    confirmPassword: seft.confirmPassword
                }
                homeService.register(registerData).then(function (res) {
                    console.log(res);
                });
            }
        }
    }
})();
