angular.module('hotmusic', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("splash",{
                url : "/splash",
                templateUrl : "tpls/splash.html",
                controller : "SplashCtrl as splash"
            })

            .state('auth', {
                abstract: true,
                templateUrl: 'tpls/auth/auth.html',
                controller: 'AuthCtrl as auth'
            })
            .state('auth.login', {
                url : "/login",
                views:{
                    "auth-view" : {
                        templateUrl: 'tpls/auth/login.html'
                    }
                },
                data : {
                    title : "登录"
                }
            })
            .state('auth.register', {
                url : "/register",
                views:{
                    "auth-view" : {
                        templateUrl: 'tpls/auth/register.html'
                    }
                },
                data : {
                    title: "注册"
                }

            })

        //默认路径
        $urlRouterProvider.otherwise('/splash');

    })

    .constant('SERVER', {
        url: 'https://api.songhop.fm/v1'
    })