import $ from 'jquery';
import autosize from 'autosize';

import Modal from './core/Modal';
import Message from './core/Message';
import User from './core/User';

var user;

const contentFormTextarea = $('.js-form__textarea');

$('.js-signin-form').submit(function(event) {

  event.preventDefault();

  user = new User($(this).find('[name="name"]').val());

  Modal.close();

  contentFormTextarea.focus();

})


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

    let message = new Message(user, $(this).val());

    message.send();

    $(this).val('');

    autosize.update(contentFormTextarea);

    return false;

  }

});
