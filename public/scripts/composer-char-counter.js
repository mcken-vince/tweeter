$(document).ready(function() {

  $("#tweet-text").on('input', function(event) {
    let tweetLength = this.value.length;
    $("#counter.counter").val(140 - tweetLength);
  })

});