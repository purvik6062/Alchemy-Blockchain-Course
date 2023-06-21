import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
// import { Link, Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import FetchAccountBalance from './components/walletBalance/FetchAccountBalance';
import TransactionDetails from './components/transactions/TransactionDetails';


function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [wallet, setWallet] = useState("");
  const [network, setNetwork] = useState("");

  function handleNetworkChange(event) {
    const { name, value } = event.target;
    console.log(value)
    setNetwork(value);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setWallet(value)
    console.log(value)
  }



  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  console.log(alchemy);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);
  useEffect(() => {
    async function getBlock() {
      // setBlock(await alchemy.core.getBlock());
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const latestBlock = await alchemy.core.getBlock(latestBlockNumber);
      setBlock(latestBlock);
    }

    getBlock();
  }, []);

  return (
    <>
      <Router>
        {/* <div className="App">Block Number: {blockNumber}</div>
        <div className="">Block : {block ? JSON.stringify(block) : ""}</div> */}
        <Navbar Link={Link} />
        <Route exact path='/'><FetchAccountBalance wallet={wallet} network={network} handleChange={handleChange} handleNetworkChange={handleNetworkChange} /></Route>
        <Route exact path='/transactions'><TransactionDetails /></Route>
      </Router>
    </>
  );
}

export default App;
