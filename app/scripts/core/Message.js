import $ from 'jquery';
import Mustache from 'mustache';
import moment from 'moment';

export default class Message {

  constructor(user, message) {
    this.user = user;
    this.message = message;
  }

  send() {

    var messageTemplate = $('#messages-list__item').html();

    Mustache.parse(messageTemplate);

    var data = {
      user: this.user,
      message: this.message,
      created_at: moment().format('H:mm:ss'),
    };

    var messageTemplate = Mustache.render(messageTemplate, data);

    $('.js-messages-list').append(messageTemplate);

  }

}
