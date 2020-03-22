import { Server as SocketIOServer } from 'socket.io';


const SocketHandler = (io: SocketIOServer): void => {
  io.on('connection', (socket) => {
    socket.join('room');

    socket.on('join-room', ({ data }) => {
      socket.broadcast.emit(`joined-${data.room}`);
    });

    socket.on('call-user', (data: any) => {
      socket.to(data.to).emit('call-made', {
        offer: data.offer,
        socket: socket.id,
      });
    });

    socket.on('make-answer', (data) => {
      socket.to(data.to).emit('answer-made', {
        socket: socket.id,
        answer: data.answer,
      });
    });
  });
};

export default SocketHandler;
