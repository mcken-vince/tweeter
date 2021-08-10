$(document).ready(function() {

  $("#tweet-text").on('input', function(event) {
    const counter = $("#counter.counter");
    let tweetLength = this.value.length;
    counter.val(140 - tweetLength);
    if (counter.val() < 0 ) {
      counter.addClass("negative");
    } else {
      counter.removeClass("negative");
    }
  })

});