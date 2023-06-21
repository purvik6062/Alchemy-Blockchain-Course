import React, { useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

function FetchAccountBalance({ wallet, network, handleChange, handleNetworkChange }) {
    const [walletBalance, setWalletBalance] = useState(null);

    // const [configs, setConfigs] = useState({
    //     apiKey: "",
    //     network: "",
    // });

    const getBalance = async (address, net) => {
        console.log("Button Clicked")
        if (!address) {
            console.error("Invalid address");
            return;
        }

        const config = {
            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
            network: net,
        }
        // setConfigs({ network: config.network })
        console.log(config.network)
        const alchemy = new Alchemy(config);

        const response = await alchemy.core.getBalance(address, 'latest');
        setWalletBalance(response._hex)
        console.log(response);
    }

    return (
        <>
            <div className='flex'>
                <h1>Check your wallet balance.</h1>
                <select
                    name="networkList"
                    id="networkList"
                    onChange={handleNetworkChange}
                    defaultValue="Choose your network"
                >
                    <option defaultValue="Choose your network" />
                    <option value="Choose your network">Choose your network</option>
                    <option value="eth-mainnet">Ethereum Mainnet</option>
                    <option value="eth-goerli">Ethereum Goerli</option>
                    <option value="polygon-mumbai">Polygon Mumbai</option>
                </select>
                <input
                    type="text"
                    name="wallet"
                    value={wallet}
                    placeholder="Enter wallet address"
                    onChange={handleChange}
                    style={{ margin: '0 2% 0 2%', width: '325px', padding: '3px' }}
                />
                <input
                    type="button"
                    value="Get Balance"
                    onClick={() => getBalance(wallet, network)}
                    style={{ margin: '0 2% 0 0' }}
                />
                <span>
                    Balance:
                    {walletBalance && ` ` + parseInt(walletBalance, 16) / Math.pow(10, 18) + ` ${network}`}
                </span>
            </div>
        </>
    )
}

export default FetchAccountBalance