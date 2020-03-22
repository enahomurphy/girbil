import IO from 'socket.io-client';

let isAlreadyCalling = false;

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

const socket = IO(process.env.API_URL, { forceNew: false });

export const callUser = async (room) => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  socket.emit('call-user', {
    offer,
    to: room,
  });
};

export const listen = async (room, cb) => {
  socket.on(room, (data) => {
    cb(data);
  });
};

export const join = async (room) => {
  socket.emit('join-room', { data: { room } });
};

socket.on('call-made', async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer),
  );

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit('make-answer', {
    answer,
    to: data.socket,
  });
});

socket.on('answer-made', async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.answer),
  );

  if (!isAlreadyCalling) {
    callUser(data.socket);
    isAlreadyCalling = true;
  }
});

peerConnection.ontrack = function ontrack({ streams: [stream] }) {
  const remoteVideo = document.getElementById('video');
  if (remoteVideo) {
    remoteVideo.srcObject = stream;
    remoteVideo.play();
  }
};

navigator.getUserMedia(
  { video: true, audio: true },
  (stream) => {
    const localVideo = document.getElementById('video');
    if (localVideo) {
      localVideo.srcObject = stream;
    }

    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
  },
  (error) => {
    console.error(error.message);
  },
);
