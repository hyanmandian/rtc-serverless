import $ from 'jquery';

export default new class Modal {

  close() {
    $('.modal').fadeOut();
  }

}
