"use strict";

import VimeoPlayer from "@vimeo/player";

const onPlay = function() {
    let currentTime = player.currentTime();
    let startTime = 0;
    startTime = currentTime;
    // data is an object containing properties specific to that event
};

player.on('timeupdate', function(data) {
   let time = data.seconds;
   let timeString = JSON.stringify(time);
      localStorage.setItem('videoplayer-current-time', time);
   
});


let storageTime = localStorage.getItem('videoplayer-current-time');
let javasTime = JSON.parse(storageTime);

player.setCurrentTime(javasTime).then(function(seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});
