import $ from 'jquery';
import Firebase from 'firebase';
import 'rtcmulticonnection';
import Message from './Message';

export default class Connection {

  constructor(user) {

  	this.user = user;
  	this.connection = new window.RTCMultiConnection();

  	this.connection.firebase = 'luminous-heat-2865';
		this.connection.userid = user.id;
		this.connection.session = {
	  	data: true,
	  	audio: false,
	  	video: false,
		};

		this.connection.autoCloseEntireSession = true;

		this.connection.onmessage = (e) => {
			(new Message(e.data.user, e.data.message)).append();
		}

		this.connection.onopen = (e) => {
			this.stopLoading();
		}

		this.connect('general');

  }

  connectFirebase(resource) {
  	return new Firebase('https://' + this.connection.firebase + '.firebaseio.com/' + resource);
  }

  startLoading() {
  	$('.chat').addClass('chat--blur');
  	$('body').addClass('loading');
  }

  stopLoading() {
  	$('.chat').removeClass('chat--blur');
  	$('body').removeClass('loading');
  }

  connect(channel) {
		
		this.startLoading();

		this.channel = channel;

		var firebaseChannel = this.connectFirebase(channel);
		var firebaseUser = this.connectFirebase(channel + '/users');

		firebaseChannel.once('value', (data) => {
		  (data.val() == null) ? this.open(channel) : this.join(channel);

    	var ref = firebaseUser.push();
    			ref.set(this.user);
    			ref.onDisconnect().remove();
		});

  }

  open(channel) {
  	try {
	  	this.connection.open(channel);

	  	var firebaseChannel = this.connectFirebase(channel);
	  			firebaseChannel.set(channel);
	    		firebaseChannel.onDisconnect()
	    									 .remove();
  	} catch(e) {
  		this.connect(channel);	
  	}
  }

  join(channel) {	
  	try {
  		this.connection.join(channel);

  		var firebaseChannel = this.connectFirebase(channel);

  		firebaseChannel.on('child_removed', (data) => {
				this.connect(channel);
			});

  	} catch(e) {
			this.connect(channel);  		
  	}
  }

  send(message) {
		(new Message(this.user, message)).append();
    this.connection.send({
      user: this.user,
      message: message,
    });
  }

}
