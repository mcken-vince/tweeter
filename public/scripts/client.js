$(document).ready(function() {
  
  const createTweetElement = function(tweetData) {
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
    for (const user in users) {
      $tweetsContainer.append(createTweetElement(users[user]));
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweetsFromServer) {
        renderTweets(tweetsFromServer);
      });
  };

  loadTweets();

  $('#submit-form').submit(function(event) {
    event.preventDefault();

    const $tweetText = $(this).find('#tweet-text');
  
    if ($tweetText.val().length < 1) {
      alert("Post what?! Text is empty.");
    } else if ($tweetText.val().length > 140) {
      alert("Your tweet is over the 140 character limit!");
    } else {
      // convert form data into a query string and post it to /tweets
      const queryStringData = $('#submit-form').serialize();
      $.post("/tweets", queryStringData, function() {
        loadTweets();
      });
    }
  });

});
