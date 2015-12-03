import $ from 'jquery';
import autosize from 'autosize';
import Firebase from 'firebase';

import Modal from './core/Modal';
import User from './core/User';
import Connection from './core/Connection';
import Mustache from 'mustache';

var user;
var connection;

const contentFormTextarea = $('.js-form__textarea');

Modal.open('signin-modal');

$('.js-signin-form').submit(function(event) {

  event.preventDefault();

  user = new User($(this).find('[name="name"]').val());
  connection = new Connection(user);

  Modal.close('signin-modal');

  contentFormTextarea.focus();

  connection.onChannels((channels) => {
    var messageTemplate = $('#channels-list__item').html();

    var channels = Object.keys(channels).map((value, index) => {
      if(value == $('[data-channel]').data('channel')) return ;

      var users = Object.keys(channels[value]['users']).map((e, index) => {
        return {
          name: channels[value]['users'][e]['name'],
          id: channels[value]['users'][e]['id'],
        }
      });

      return {
        name: value,
        users: users,
      }
    });

    var messageTemplate = Mustache.render(messageTemplate, {
      channels: channels
    });

    $('.js-channels-list').append(messageTemplate);
  });

});

$('.js-channel-modal').click(() => {
  Modal.open('channel-modal');
})

$('body').on('click', '.js-join-channel', function() {
  console.log($(this).html());
  connection.connect($(this).data('channel'));
})

$('.js-channel-form').submit(function(event) {
  event.preventDefault();
  connection.connect($(this).find('[name="name"]').val());

  Modal.close('channel-modal');
});

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
