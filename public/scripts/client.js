/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants."
      },
    "created_at": 1461116232227
  }
  
  createTweetElement = function(tweetData) {
    const $newTweet = $(`
      <article class="tweet">
        <header>
          <div class="left-hand">
            <img src=${tweetData.user.avatars} alt="profile-pic">
            <p>${tweetData.user.name}</p>
          </div>
          <a>${tweetData.user.handle}</a>
        </header>
        <content>
          <p><b>${tweetData.content.text}</b></p>
        </content>
        <footer>
          <p>${tweetData.created_at}</p>
          <div class="icons">
            <i class="fas fa-solid fa-flag hover-icon"></i>
            <i class="fas fa-solid fa-retweet hover-icon"></i>
            <i class="fas fa-solid fa-heart hover-icon"></i>
          </div>
        </footer>
      </article>`);
      
      return $newTweet;
    };

    const $tweet = createTweetElement(tweetData);
    console.log($tweet);

    $('#tweets-container').append($tweet);




});