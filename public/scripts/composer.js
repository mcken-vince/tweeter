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

  // used in scroll event listener below
  // defined outside for minimal DOM crawling
  const $toggleTop = $('#toggle-top');
  const $navigation = $('.navigation');
  
  // show toggle button when scrolling below header
  // also toggle background on nav bar
  $(window).scroll(function() {
    if ($(window).scrollTop() > 210) {
      $toggleTop.show('swing');
      $navigation.addClass('background-on');
    } else {
      $toggleTop.hide('fast');
      $navigation.removeClass('background-on');
    }
  });

});