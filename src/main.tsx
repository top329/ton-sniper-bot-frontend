import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import App from './App.tsx';
import SocketProvider from './contexts/socketContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl="https://api.tongochi.org/static/ton-connect.manifest.json">
    <SocketProvider>
      <App />
    </SocketProvider>
  </TonConnectUIProvider>
);
