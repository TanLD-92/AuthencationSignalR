(function () {
    'use strict';

    angular
        .module('home.module')
        .service('homeService', HomeService);

    HomeService.$inject = ['$http', '$rootScope', '$q'];

    function HomeService($http, $rootScope, $q) {
        var seft = this;
        seft.serviceBase = 'http://localhost:58923/';
        seft.messageHub = null;
        seft.proxyHub = null;
        seft.connectHub = connectHub;
        seft.SendChatMessage = SendChatMessage;
        seft.register = register;

        //register service
        function register(param) {
            var deferred = $q.defer();

            $http.post(seft.serviceBase + 'api/Account/Register', param).success(function (response) {

                //    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                //    _authentication.isAuth = true;
                //    _authentication.userName = response.userName;
                //    _authentication.useRefreshTokens = false;

                //    deferred.resolve(response);

                //}).error(function (err, status) {
                //    _logOut();
                //    deferred.reject(err);
                //});

                deferred.resolve(response);
            }).error(function (err, status) {
                    deferred.reject(err);
            });
            return deferred.promise;
        }

        //connectHub 
        function connectHub() {
            seft.messageHub = $.hubConnection();
            seft.proxyHub = seft.messageHub.createHubProxy('serverHub');
            //public an event server
            seft.proxyHub.on('addMessageToPage', function (name,message) {
                $rootScope.$emit("addMessageToPage", name, message);
            });
            seft.messageHub.start().done(function () {
                $rootScope.$emit("doneConnectServer");
            });
        }
        //emit event get message hub from client
        //function getMessageHubClient() {
        //    $rootScope.$emit("getMessageHubClient");
        //}
        //get message hub
        function SendChatMessage() {
            seft.proxyHub.invoke('SendChatMessage');
        }
        return {
            connectHub: connectHub,
            SendChatMessage: SendChatMessage,
            register: register
        }
    }
})();