angular.module("hotmusic")
       .controller("MainCtrl",function($scope ,$rootScope, $log ,$state,$ionicViewService,$ionicTabsDelegate,songListService,userService){
                var _this = this;

                    _this.songList =  songListService;

                    //当前的选项卡
                    $scope.currentTab = 0;

                    // figure out where the tabs are at
                    $scope.mainTabs = $ionicTabsDelegate.$getByHandle('main-tabs');




                    /** 标签页切换 **/
                    $scope.tabClick = function(index){
                        if( index == $scope.currentTab){
                            if(index == 0){
                                if (window.location.hash != '#/app/discover') {
                                    console.log('disabling next nav');
                                    $ionicViewService.nextViewOptions({
                                        disableBack: true
                                    });
                                }
                                $state.go('app.discover', {}, {location:'replace'});
                            }
                            else if(index == 1){
                                if (window.location.hash != '#/app/profile/' + User.user.username) {
                                    console.log('disabling next nav');
                                    $ionicViewService.nextViewOptions({
                                        disableBack: true
                                    });
                                }
                                $state.go('app.profile', {username:userService.user.username}, {location:'replace'});
                            }
                        }
                        else{
                            $scope.mainTabs.select(index, true);
                        }
                    }

                    $scope.setCurrentTab = function(index){
                        $scope.currentTab = index;
                    }
                    $scope.broadcastTabChange =function(tab){
                        $rootScope.$broadcast('tabchange' + tab);
                    }


        });