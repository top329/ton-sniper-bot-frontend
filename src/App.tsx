import { useEffect, useState } from 'react';
import {
  TonConnectButton,
  TonConnectUIProvider,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import TonWeb from 'tonweb';
import { DEX, pTON } from '@ston-fi/sdk';

import * as buffer from 'buffer';
window.Buffer = buffer.Buffer;

import './App.css';

function App() {
  const router = new DEX.v1.Router({
    tonApiClient: new TonWeb.HttpProvider(),
  });
  // const [transaction, setTransaction] = useState({});

  // const [tonConnectUI, setOptions] = useTonConnectUI();

  // useEffect(() => {
  //   async function init() {
  //     const txParams = await router.buildSwapTonToJettonTxParams({
  //       userWalletAddress: '', // ! replace with your address
  //       proxyTonAddress: pTON.v1.address,
  //       offerAmount: new TonWeb.utils.BN('1000000000'),
  //       askJettonAddress: 'EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO', // STON
  //       minAskAmount: new TonWeb.utils.BN('1'),
  //       queryId: 12345,
  //     });
  //     console.log(txParams);
  //   }
  //   init();
  // },[])

  return (
    <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
      <span>My App with React UI</span>
      <TonConnectButton />
      {/* <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
        Send transaction
      </button> */}
    </TonConnectUIProvider>
  );
}

export default App;
