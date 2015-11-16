import $ from 'jquery';
import autosize from 'autosize';

class Modal {

  static close() {
    $('.modal').fadeOut()
    $('.chat').removeClass('chat--blur')
  }

}

class User {

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

}

class Message {

  static send() {
    $('.js-messages-list').append("<li class='chat__messages-list__item'><div class='chat__user'><span class='chat__user__avatar' style='background-image: url(https://secure.gravatar.com/avatar/b15fc8bc4959afe910b53c6fc8b6dc60.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F272a%2Fimg%2Favatars%2Fava_0026-48.png);'></span><strong class='chat__user__name'>User</strong><time datetime='2008-02-14 20:00' class='chat__user__created-at'>2008-02-14 20:00</time><p class='chat__user__message'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit accumsan dictum. Nam eu interdum metus. Donec nisl urna, semper tincidunt volutpat non, pretium quis massa. Donec ac justo nulla. Cras fringilla eget tellus sed faucibus. Maecenas leo enim, vestibulum eget dui id, scelerisque ornare augue. Phasellus pulvinar porta tortor at fermentum. Maecenas quis velit vitae tellus tincidunt scelerisque. Ut dictum magna felis, eu ultricies ante feugiat in. Vestibulum fermentum elit vehicula ante varius hendrerit. Sed hendrerit pellentesque nisi sed convallis.</p></div></li>");
  }

}

const user = new User;

$('.js-signin-form').submit(function(event) {

  event.preventDefault();

  user.setName = $(this).find('[name="name"]').val();

  Modal.close();

})

const contentFormTextarea = $('.js-form__textarea');

autosize(contentFormTextarea);

contentFormTextarea.keydown(function (e) {

  if (e.keyCode === 13 && e.ctrlKey) {

    $(this).val(function(index, val){
      return val + "\n";
    });

    autosize.update(contentFormTextarea);

  }

}).keypress(function(e){

  if (e.keyCode === 13 && !e.ctrlKey) {

    Message.send($(this).val());

    $(this).val('');

    autosize.update(contentFormTextarea);

    return false;

  }

});
