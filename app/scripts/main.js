import $ from 'jquery';
import autosize from 'autosize';
import Firebase from 'firebase';

import Modal from './core/Modal';
import User from './core/User';
import Connection from './core/Connection';

var user;
var connection;

const contentFormTextarea = $('.js-form__textarea');

$('.js-signin-form').submit(function(event) {

  event.preventDefault();

  user = new User($(this).find('[name="name"]').val());
  connection = new Connection(user);

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

    connection.send($(this).val());
    $(this).val('');

    autosize.update(contentFormTextarea);

    return false;

  }

});
