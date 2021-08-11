$(document).ready(function() {
  
  const createTweetElement = function(tweetData) {
    // need to correct this to prevent malicious scripts from running in tweet data
    const $newTweet = $(`
      <article class="tweet">
        <header>
          <div class="left-hand">
            <img src=${tweetData.user.avatars} alt="profile-pic">
            <p>${tweetData.user.name}</p>
          </div>
          <a>${tweetData.user.handle}</a>
        </header>
        <div class="content">
          <p><b>${tweetData.content.text}</b></p>
        </div>
        <footer>
          <p>${timeago.format(tweetData.created_at)}</p>
          <div class="icons">
            <i class="fas fa-solid fa-flag hover-icon"></i>
            <i class="fas fa-solid fa-retweet hover-icon"></i>
            <i class="fas fa-solid fa-heart hover-icon"></i>
          </div>
        </footer>
      </article>`);
      
    return $newTweet;
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

  loadTweets();

  $('#submit-form').submit(function(event) {
    event.preventDefault();

    const $tweetText = $(this).find('#tweet-text');
    // check edge cases
    if (!$tweetText.val()) {
      alert("Post what?! Text is empty.");
    } else if ($tweetText.val().length > 140) {
      alert("Your tweet is over the 140 character limit!");
    } else {
      // if tweet passes checks, post it!
      const queryStringData = $('#submit-form').serialize();
      $.post("/tweets", queryStringData, function() {
        loadTweets();
      });
      // clear textarea
      $('#tweet-text').val('');
    }
  });

});
