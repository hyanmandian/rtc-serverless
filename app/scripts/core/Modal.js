import $ from 'jquery';

export default new class Modal {

  open(modal) {
    $('#' + modal).fadeIn();
  }

  close(modal) {
    $('#' + modal).fadeOut();
  }

}
