import $ from 'jquery';
import Mustache from 'mustache';
import moment from 'moment';

export default class Message {

  constructor(user, message) {
    this.user = user;
    this.message = message;
  }

  nl2br (str) {
    var breakTag = '</br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  append() {

    var messageTemplate = $('#messages-list__item').html();

    Mustache.parse(messageTemplate);

    var data = {
      user: this.user,
      message: this.nl2br(this.message),
      created_at: moment().format('H:mm:ss'),
    };

    var messageTemplate = Mustache.render(messageTemplate, data);

    $('.js-messages-list').append(messageTemplate);

  }

}
