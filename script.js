chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {

  /**
    * Netflix DOM Structure by class:
    * - subtitles: .player-timedText
    * - seekbar: .scrubber-head
    * - current progress: .current-progress
    * - time remaining: .time-remaining__time
    * - seek button: .touchable.PlayerControls--control-element.nfp-button-control.default-control-button.button-nfplayerFastForward
    * - the video: .NFPlayer.nf-player-container
    */

  console.log("Started button clicked, began watching video.");

  var whenToSkip = message.whenToSkip; //hh:mm:ss
  var secondsToSkip = parseInt(message.secondsToSkip); //number in seconds

  var [hour, minutes, seconds] = whenToSkip.split(':');
  const total = (parseInt(hour)*3600) + (parseInt(minutes)*60) + parseInt(seconds); //in seconds
  const skips = secondsToSkip/10; //number of seeks to click, 10 since netflix skips 10 seconds on seek button click

  console.log("When to skip: " + whenToSkip + " or in seconds: " + total);
  console.log("How many seconds to skip: " + secondsToSkip + " or in skips(button clicks): " + skips);

  // this is the seek 10 seconds button on netflix
  const seekButton = document.querySelector(".touchable.PlayerControls--control-element.nfp-button-control.default-control-button.button-nfplayerFastForward");

  var playerDiv = document.querySelector(".NFPlayer.nf-player-container");
  var video = playerDiv.getElementsByTagName("video")[0]; //loop over video.currentTime to get current seconds

  console.log("Video being watched: " + video);
  
  var movieTimer = setInterval(() => {
    var currentTime = video.currentTime; //in seconds
    console.log("Timer working, video currentTime: " + currentTime);

    if (currentTime >= total) {
      clearInterval(movieTimer);
      console.log("Gonna seek now")
      seekForward(skips, seekButton);
    }
  }, 1000);

  ////////////////////////////////////////////////////////////////
  /**
   * Another approach would be, something like commented below, to use: `video.currentTime=<time-desired>`, but for some reason Netflix always stops with an error 
   * if the time was modified using this method.
   */
  // video.pause();

  // setTimeout(()=> {
  //   video.currentTime = 400;
  // }, 1000);

  // setTimeout(()=> {
  //   video.play();
  // }, 5000);

  // var timer = setInterval(function() {
  //   if (video.paused && video.readyState ==4 || !video.paused) {
  //       video.play();
  //       clearInterval(timer);
  //   }       
  // }, 100);
  ///////////////////////////////////////////////////////////////////////

});


/**
 * This function performs a seek button click (skip netflix's 10 seconds on each click). 
 * There is a 500ms delay between each click, wasn't registering more than 2 clicks without the timer.
 * @param {number of clicks on seek button required} skips 
 * @param {The seek button extracted from the DOM} seekButton 
 */
function seekForward(skips, seekButton) {
  var i = 1;
  var seekingTimer = setInterval(()=> {
    if (i <= skips) {
      console.log("seek number: " + i);
      seekButton.click();
      i++;
    } else {
      clearInterval(seekingTimer);
    }
  }, 500);
}