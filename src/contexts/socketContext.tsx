import { createContext } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext<any>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io('http://localhost:5000', { transports: ['websocket'] });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
