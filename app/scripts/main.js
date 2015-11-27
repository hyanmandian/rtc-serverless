import $ from 'jquery';
import autosize from 'autosize';
import Firebase from 'firebase';

import Modal from './core/Modal';
import Message from './core/Message';
import User from './core/User';


import 'rtcmulticonnection';

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
    connection.send({
      user: user,
      message: $(this).val()
    });

    $(this).val('');

    autosize.update(contentFormTextarea);

    return false;

  }

});

var connection = new window.RTCMultiConnection();

connection.firebase = 'luminous-heat-2865';
connection.userid = Date.now();
connection.session = {
  data: true,
};

var firebaseURL = 'https://' + connection.firebase + '.firebaseio.com/';
var connectionRefences = new Firebase(firebaseURL + connection.channel);

connectionRefences.once('value', function (data) {
  if (data.val() == null) {
    connection.open(connection.channel);
    connectionRefences.set(connection.channel);
    connectionRefences.onDisconnect().remove();
  } else {
    connection.join(connection.channel);
  }
});

connection.onmessage = function(e) {
  var message = new Message(e.data.user, e.data.message);
  message.send();
}

window.connection = connection;

