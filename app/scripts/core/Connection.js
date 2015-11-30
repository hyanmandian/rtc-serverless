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

		this.connection.onmessage = function(e) {
			(new Message(e.data.user, e.data.message)).append();
		}

		var self = this;

		this.connection.onopen = function(e) {
			self.stopLoading();
		}

		this.connection.onleave = function(e) {
			if(e.entireSessionClosed) {
				self.connect(self.channel);
			}
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
		var self = this;

		firebaseChannel.once('value', function (data) {
		  if (data.val() == null) {
		    self.open(channel);
		  } else {
		    self.join(channel);
		  }

    	var ref = firebaseUser.push();
    	ref.set(self.user);
    	ref.onDisconnect().remove();
		});

  }

  open(channel) {
  	try {
	  	this.connection.open(channel);

	  	var self = this;
	  	var firebaseChannel = this.connectFirebase(channel);
	  			firebaseChannel.set(channel);
	    		firebaseChannel.onDisconnect().remove();
  	} catch(e) {
  		this.connect(channel);	
  	}
  }

  join(channel) {	
  	try {
  		this.connection.join(channel);
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
