function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var url = "https://api.github.com/users/"+ user
    var x = new XMLHttpRequest();
    x.open('GET', url, false);
    x.send();
    return x;

   // // $.ajax({
   //      type: "GET",
   //      dataType: 'json',
   //      url: url
   //  }).done(function(data) {
   //      console.log(data);
   //      return data;
   //
   //  }).fail(function(data) {
   //      console.log(data)
   //  });


}

function showUser(user) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $('h2').html(user.login);
    $('div.avatar').html('<img src="' + user.avatar_url +'">');
    $('div.information').html('<a href="' + user.html_url +'">Link</a>');

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $('h2').html("sorry no user: "+username);

}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);

            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
