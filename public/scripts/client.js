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
    for (const user of users) {
      $tweetsContainer.append(createTweetElement(user));
    }
  };


  $('#submit-form').submit(function(event) {
    event.preventDefault();
    // convert form data into a query string and post it to /tweets
    const queryStringData = $('#submit-form').serialize();
    $.post("/tweets", queryStringData, function(data) {
      console.log("Data has been posted! ", data);
    });
  });

});
