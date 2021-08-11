$(document).ready(function() {
  
  const createTweetElement = function(tweetData) {
    // using .text() to prevent XSS (cross site scripting)
    // create header & all child elements
    const $leftDiv = $('<div class="left-hand"></div>');
    const $avatar = $('<img>').attr('src', tweetData.user.avatars);
    const $name = $('<p>').text(tweetData.user.name);
    const $handle = $('<a>').text(tweetData.user.handle);
    $leftDiv.append($avatar, $name);
    const $header = $('<header>').append($leftDiv, $handle);
    // create content with text inside
    const $content = $('<div class="content">');
    const $tweetText = $('<p></p>').text(tweetData.content.text);
    $content.append($tweetText);
    // create footer & all child elements
    const $footer = $('<footer>');
    const $time = $('<p>').text(timeago.format(tweetData.created_at));
    const $icons = $('<div class="icons">');
    const $flagIcon = $('<i class="fas fa-solid fa-flag hover-icon"></i>');
    const $retweetIcon = $('<i class="fas fa-solid fa-retweet hover-icon"></i>');
    const $heartIcon = $('<i class="fas fa-solid fa-heart hover-icon"></i>');
    $icons.append($flagIcon, $retweetIcon, $heartIcon);
    $footer.append($time, $icons);
    // final product $article, append children
    const $tweetElement = $('<article class="tweet"></article>');
    $tweetElement.append($header, $content, $footer);

    return $tweetElement;
  };

  const renderTweets = function(users) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    // iterate through array backwards, from newest to oldest
    for (let user = users.length - 1; user >= 0; user--) {
      $tweetsContainer.append(createTweetElement(users[user]));
    }
  };

  // get tweets from /tweets and re-render page to display all tweets in database
  const loadTweets = function() {
    $.get('/tweets', (tweetsFromServer) => {
      renderTweets(tweetsFromServer);
    });
  };

  // load tweets on page load
  loadTweets();

  $('#submit-form').submit(function(event) {
    event.preventDefault();
    const $error = $(this).parent().find('#error');
    const $tweetText = $(this).find('#tweet-text');
    // check edge cases
    if (!$tweetText.val()) {
      $error.slideUp('fast');
      $error.slideDown('').text("⚠︁  Tweet what?? You haven't written anything!  ⚠︁");
    } else if ($tweetText.val().length > 140) {
      $error.slideUp('fast');
      $error.slideDown('slow').text("⚠︁  Your tweet has exceeded the limit of 140 characters!  ⚠︁");
    } else {
      // if tweet passes checks, post it!
      $error.slideUp();
      const queryStringData = $('#submit-form').serialize();
      $.post("/tweets", queryStringData, function() {
        loadTweets();
      });
      // clear textbox
      $('#tweet-text').val('');
      $('.counter').text('140');
    }
  });

  // submit tweet when enter key is pressed
  $('#tweet-text').keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $(this).parent().submit();
    }
  });

  // toggle new-tweet form on click
  $('.toggle-compose').click(function() {
    const $newTweet = $(this).parent().parent().find('.new-tweet');
    if ($newTweet.css("display") === 'none') {
      $newTweet.slideDown();
      $('#tweet-text').focus();
    } else {    
      $newTweet.slideUp();
    }
  });

  // scroll to top
  $('#toggle-top').click(function() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
    });

});
