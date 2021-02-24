chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {

  console.log("Started button clicked, began watching video.");

  const whenToSkip = message.whenToSkip;
  const secondsToSkip = message.secondsToSkip;

  console.log(whenToSkip);
  console.log(secondsToSkip);

  // this is the seek 10 seconds button on netflix
  const seekButton = document.querySelector(".touchable.PlayerControls--control-element.nfp-button-control.default-control-button.button-nfplayerFastForward");

  var playerDiv = document.querySelector(".NFPlayer.nf-player-container");
  var video = playerDiv.getElementsByTagName("video")[0]; //loop over video.currentTime to get current seconds

  console.log("Video being watched: " + video);

  const timeToReach = 100; //in seconds

  var myTimer = setInterval(() => {
    var currentTime = video.currentTime; //in seconds
    console.log("Timer working, video currentTime: " + currentTime);

    if (currentTime >= timeToReach) {
      seekButton.click(); //skip 10 seconds
      seekButton.click(); //skip 10 seconds
      seekButton.click(); //skip 10 seconds
      seekButton.click(); //skip 10 seconds
      clearInterval(myTimer);
    }
  }, 1000);

    // function for manipulating styles
    // changeSubtitlesStyle(message.vPos, message.fSize, message.fColor);
});


// changeSubtitlesStyle = (vPos, fSize, fColor) => {
//     console.log("%cnetflix-subtitles-styler : observer is working... ", "color: red;");
  
//     // add a mutation observer on this div? get the current value from "aria-valuenow"
//     const scrubberHead = document.querySelector(".scrubber-head"); //<div aria-label="Seek time scrubber" aria-valuemax="1050" aria-valuemin="0" aria-valuenow="603" aria-valuetext="10:03 of 17:30" class="scrubber-head" tabindex="0" style="left: 57.47%;"></div>


//     const observer = new MutationObserver(callback);
//     callback = () => {
//       /**
//        * DOM Structure by class:
//        * - subtitles: .player-timedText
//        * - seekbar: .scrubber-head
//        * - current progress: .current-progress
//        * - time remaining: .time-remaining__time
//        */

//       // this is the seek 10 seconds button on netflix
//       const seekButton = document.querySelector(".touchable.PlayerControls--control-element.nfp-button-control.default-control-button.button-nfplayerFastForward");

//       // var currentTime = parseInt(scrubberHead.getAttribute("aria-valuenow"));


//       var playerDiv = document.querySelector(".NFPlayer.nf-player-container");
//       var video = playerDiv.getElementsByTagName("video")[0]; //loop over video.currentTime to get current seconds

//       while (true) {
//         var currentTime = video.currentTime; //in seconds
//         const timeToReach = 500; //in seconds

//         if (currentTime >= timeToReach) {
//           seekButton.click(); //skip 10 seconds
//           observer.disconnect();
//         }
//       }
//     };
  
//     observer.observe(scrubberHead, {
//       subtree: true,
//       attributes: true,
//       childList: true
//     });
// };