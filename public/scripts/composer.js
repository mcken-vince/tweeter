$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    const $counter = $(this).parent().find('.counter');
    let tweetLength = this.value.length;
    $counter.val(140 - tweetLength);
    if ($counter.val() < 0) {
      $counter.addClass("negative");
    } else {
      $counter.removeClass("negative");
    }
  });

  const $toggleTop = $('#toggle-top');
  $(window).scroll(function() {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > 500) {
      $toggleTop.show('swing');
    } else {
      $toggleTop.hide('fast');
    }
  });

});