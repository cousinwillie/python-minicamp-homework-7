$(function(){
  populatePosts();
});

function populatePosts(){
  $.ajax({
    url: '/posts' //From the app.route('/posts')
  }).done(function(response){
    var template = $('#post-template').html();  //Grab the html from the scripts
    response.forEach(function(post){      //Loop for every single post
      console.log('>>post', post);
      var newPost = $(template).clone();  // Clone the template
      $(newPost).find('.title').html(post[1]); //Change the value in title for post[1]
      $(newPost).find('.author').html(post[0]); //Same with the rest of elements
      $(newPost).find('.body').html(post[2]);
      $(newPost).find('.likes').html(post[3]);
      $(newPost).find('.likes-button').on('click', function(){
        $.ajax({
          url: '/like/' + post[4] // From @app.route('/like/<post_id>')
        }).done(function(){
          $(newPost).find('.likes').html(++post[3]);
        });
      });
      $('#post-list').append(newPost);  // Add it to the ul in the HTML
    });
  });
};
