/** 本地存储文件  HTML5 FILE **/
angular.module('hotmusic')
.factory('Storage', function($q, $log, $ionicPlatform) {

  // Resolve if user is authenticated
  // Reject if user needs to authenticate
  var authDefer = $q.defer();

  var dataDir = null;

  var errorHandler = function(err){
    $log.error("Error", err);
  };

  // store liked songs and recent playlists here:
  // cordova.file.cacheDirectory
  var o = {
    authPromise: authDefer.promise,
    saveCredentials: errorHandler
  };

  o.authPromise.finally(function(){

    // bind saveCredentials function only after we've
    // opened the file
    o.saveCredentials = function(credentials) {

      var defer = $q.defer();

      dataDir.getFile('credentials.json', {
        create:true
      }, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.onwriteend = function(e){
            $log.info("Credentials written");
            defer.resolve();
          };

          fileWriter.onerror = function(e){
            $log.error("error writing credentials");
            defer.reject();
          };

          var blob = new Blob([angular.toJson(credentials)], {type: 'text/json'});
          fileWriter.write(blob);

        }, errorHandler);
      }, errorHandler);

      return defer.promise;
    };

    o.deleteCredentials = function(){
      var defer = $q.defer();

      dataDir.getFile('credentials.json', {}, function(fileEntry) {
        fileEntry.remove(function() {
          defer.resolve();
        }, function(){
          // reslove on failure because we don't care if it doesn't exist
          defer.resolve();
        });
      }, errorHandler);

      return defer.promise;
    };

  }, errorHandler.bind(null, "Promise not fired") );

  $ionicPlatform.ready(function(){

    // for caching stuff
    // window.resolveLocalFileSystemURL(cordova.file.cacheDirectory,
    //   function(cacheDir){
    //     // $log.log("cache");
    //     // $log.log(cacheDir);
    //   });

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory,
      function(dataDirectory) {
        dataDir = dataDirectory;

        dataDir.getFile('credentials.json', {}, function(fileEntry) {

          fileEntry.file(function(file){

            var reader = new FileReader();
            reader.onloadend = function(e) {
              var data = this.result;

              if(data){
                o.credentials = JSON.parse(data);

                authDefer.resolve(o.credentials);
              } else {
                authDefer.reject();
              }

            };
            reader.readAsText(file);

          }, errorHandler);
        }, function(err){
          // needs to auth
          authDefer.reject();
        });

      });

  });

  return o;
});

