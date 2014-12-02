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
                controller : "SplashCtrl as splash",
                resolve : {
                    "isAuthed" : function($q,$state,userService){
                        var defer  = $q.defer();
                        userService.loadingPromise.then(function(){
                            console.log("自动验证!..."+userService.user);
                            if (!userService.user.username || !userService.user.name) {
                                $state.go('profile');
                            } else {
                                $state.go('app.discover');
                            }
                            defer.resolve(true);
                        },function(){
                            defer.resolve(true);
                        });
                    }
                }
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
            .state('app',{
                url : "/app",
                abstract:true,
                templateUrl:  "tpls/app/main.html",
                controller:  "MainCtrl"
            })

            .state("app.discover",{
                url : "/discover",
                views : {
                    "tab-discover" : {
                        "templateUrl" :"tpls/app/discover/search.html",
                        "controller"   : "SearchCtrl"
                    }

                }
            })

            .state("app.profile",{
                url : "/profile:username",
                views : {
                    "tab-profile" :{
                        "templateUrl" : "tpls/app/favorite.html",
                        "controller" : "FavoriteCtrl"
                    }
                }

            })

        //默认路径
        $urlRouterProvider.otherwise('/splash');

    })

    .constant('SERVER', {
        url: 'https://api.songhop.fm/v1'
    })