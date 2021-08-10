$(document).ready(function() {

  $("#tweet-text").on('input', function(event) {
    let tweetLength = this.value.length;
    console.log(140 - tweetLength);

  })

});