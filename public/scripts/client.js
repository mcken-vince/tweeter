const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

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

  renderTweets(data);

  $('#submit-form').submit(function(event) {
    event.preventDefault();
    console.log(event);
  });

});
