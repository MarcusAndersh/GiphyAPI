var topics = ["Elf", "Step Brothers","Sausage Party", "Talladega Nights"];

var showSearch = $('#search-theme').val().trim();

$(document).ready(function(){
  $('#search-button').on('click', function(){
    var showSearch = $('#search-theme').val().trim();
    topics.push(showSearch);
    $('#giphs').html("");
    $('#theme-buttons').html("")
    topics.map(function(show){
    var button = '<button data-show="'+show+'"class="shows">'+show+'</button>';
    $('#theme-buttons').append(button);
    });
  });

  $(document).on('click', '.shows', function(event){
    $('#giphs').html("");
    event.preventDefault();
    var showSearch = $(this).data("show");
    var urlAPI = 'https://api.giphy.com/v1/gifs/search?q='+ showSearch +'&api_key=dc6zaTOxFJmzC';
    $.ajax({
      url: urlAPI,
      method: 'GET'
    }).done(function(response){
      var result = response.data;
      for (var i = 0; i < 10; i++) {
        $('#giphs').append('<img data-state="still" data-still="'+result[i].images.fixed_height_still.url+'" data-animate="'+result[i].images.fixed_height_downsampled.url
          +'"src="'+result[i].images.fixed_height_still.url+'" class="image-button"/>').append('<div id="rating"><p>Touch Me</p>Rating: '+result[i].rating+'</div>');
      };
    });
  });

  $(document).on('click', '.image-button', function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate")
    }else{
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    };
  });
});





