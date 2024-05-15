import React, { useEffect, useState } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import TonWeb from 'tonweb';
import { DEX, pTON } from '@ston-fi/sdk';
import { StonApiClient } from '@ston-fi/api';

import './App.css';

const router = new DEX.v1.Router({
  tonApiClient: new TonWeb.HttpProvider(), // contracts on chain calls will use TON API
  stonApiClient: new StonApiClient(), // data fetching required for tx creation will use STON API
});

function App() {
  const [tonConnectUI] = useTonConnectUI();

  const [transaction, setTransaction] = useState<any>({});

  useEffect(() => {
    async function init() {
      const txParams = await router.buildSwapTonToJettonTxParams({
        userWalletAddress: 'UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi',
        proxyTonAddress: pTON.v1.address,
        offerAmount: new TonWeb.utils.BN('100000000'),
        askJettonAddress: 'EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO', // STON
        minAskAmount: new TonWeb.utils.BN('1'),
        queryId: 12345,
      });
      const tx = {
        validUntil: Date.now() + 1000000,
        messages: [
          {
            address: txParams.to.toString(true, true, true),
            amount: txParams.gasAmount.toString(),
            payload: TonWeb.utils.bytesToBase64(await txParams.payload.toBoc()),
          },
        ],
      };
      setTransaction(tx);
    }
    init();
  }, []);

  return (
    <React.Fragment>
      <span>My App with React UI</span>
      <TonConnectButton />
      <button
        onClick={() => {
          if (!tonConnectUI) {
            return;
          }
          if (!transaction || Object.keys(transaction).length === 0) {
            return;
          } else {
            tonConnectUI.sendTransaction(transaction);
          }
        }}
      >
        Send transaction
      </button>
    </React.Fragment>
  );
}

export default App;
