
angular.module('hotmusic')
.factory('Track', function($q, $log, $http, $ionicModal, $rootScope, SERVER, Spotify) {

  var _successCallback = function(cb){
    // console.log(this.title, " ready to play");

    this.buffered = true;
    this._bufferQ.resolve();

    if(this.playing) {
      _playStream.call(this);
    }
    if(cb) { cb(); }
  };
  var _errorCallback = function(){
    $log.log("there was an error buffering", this.title);
    this._bufferQ.reject();
  };

  var _playStream = function(){
    if(this._secondsCb){ this._secondsCb(); }
    this.stream.play();
  };

  var _donePlaying = function(cb){
    this.playing = false;
    this.stream.seekToTime(0);

    if(cb){ cb(); }
  };

  var resetPlayState = function() {
    this.buffering = false;
    this.buffered = false;
    this._bufferQ = $q.defer();
    this.bufferPromise = this._bufferQ.promise;
    this.playing = false;
    this.stream = null;

    this.endOfStreamCallback = false;

    // This will get called every second of playing
    this._secondsCb = null;
  };

  var Track = function(song){
    this.song = song;
    this.id = song.id;
    this.imageSmall = song.image_small;
    this.imageMedium = song.image_medium;
    this.imageLarge = song.image_large;
    this.artworkUrl = song.artwork_url;
    this.artist = song.artist;
    this.title = song.title;
    this.previewUrl = song.preview_url;
    this.favorited = song.favorited;
    this.favoriteCount = song.favorite_count;

    resetPlayState.apply(this);

  };

  Track.prototype.buffer = function(cb) {
    if(this.stream || !this.previewUrl){
      return;
    }

    this.buffering = true;
    this.stream = new window.Stream(this.previewUrl,
        _successCallback.bind(this, cb),
        _errorCallback.bind(this));

    if(this._secondsCb){
      this.stream.addCallbackToCallAtSecondsInterval( this._secondsCb );
    }
  };

  Track.prototype.secondsTickCallback = function(cb) {
    this._secondsCb = cb;
    if(this.stream){
      this.stream.addCallbackToCallAtSecondsInterval( cb );
    }
  };



  // pass an optional callback to be triggered when song is done playing
  Track.prototype.play = function(successCb, loadFinCb) {
    if(this.playing) { return; }

    this.playing = true;

    if(this.stream) {
      _playStream.call(this);
      if (loadFinCb && typeof(loadFinCb) === "function") {
        loadFinCb();
      }

    } else {
      if (loadFinCb && typeof(loadFinCb) === "function") {
        this.buffer(loadFinCb);
      } else {
        this.buffer();
      }
    }

    if(!this.endOfStreamCallback){
      var cb = _donePlaying.bind(this, successCb);

      // @todo bug: CB seems to get called 3 times
      this.stream.addEndOfStreamCallbackFunction(cb);
      this.endOfStreamCallback = true;
    }
  };

  Track.prototype.pause = function() {
    this.playing = false;
    if( this.stream ) { this.stream.pause(); }
  };

  Track.prototype.stop = function() {
    this.playing = false;

    if( this.stream ) {
      this.stream.removeEndOfStreamCallbackFunction();
      this.stream.stop();
    }
  };

  Track.prototype.destroy = function() {
    // $log.log("Blowing up", this.title);

    if( this.stream ) {
      this.stream.removeCallbackToCallAtSecondsInterval();
      this.stream.destroy();
      this.stream = null;
      resetPlayState.apply(this);
    }
  };

  Track.prototype.sendFeedback = function(stationId, rating) {
    $log.log("sending feedback for", this.title);

    var feedback = {song_id: this.id, rating: rating};

    return $http({
      method: 'POST',
      url: SERVER.url + '/stations/' + stationId + '/feedback',
      data: {
        feedback: feedback
      }
    });
  };



  return Track;
});
