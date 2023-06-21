import React, { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk';
import './TransactionDetails.css'

function TransactionDetails() {
    const [block, setBlock] = useState();
    const [blockNumber, setBlockNumber] = useState();
    const [blockHash, setBlockHash] = useState();
    const [allTransactions, setAllTransactions] = useState();
    const [singleTransaction, setSingleTransaction] = useState();

    const [selectedTransaction, setSelectedTransaction] = useState();


    const config = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);

    useEffect(() => {
        async function getBlock() {
            // // setBlock(await alchemy.core.getBlock());
            // const latestBlockNumber = await alchemy.core.getBlockNumber();
            // setBlockNumber(latestBlockNumber)
            // const latestBlock = await alchemy.core.getBlock(latestBlockNumber);
            // setBlock(latestBlock);
            // console.log(latestBlock);
            // setBlockHash(latestBlock.hash);
        }
        getBlock();
    }, []);


    useEffect(() => {
        async function getBlockWithTransaction() {
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(latestBlockNumber)

            const latestBlock = await alchemy.core.getBlock(latestBlockNumber);
            setBlock(latestBlock);

            console.log(latestBlock);
            setBlockHash(latestBlock.hash);


            const getTransactions = await alchemy.core.getBlockWithTransactions(blockHash);
            console.log(getTransactions.transactions)
            setAllTransactions(getTransactions.transactions)
            // const clearedTransactions = JSON.stringify(getTransactions.transactions);
            // setAllTransactions(clearedTransactions);
        }

        getBlockWithTransaction();
    }, []);


    const handleButtonClick = async (hash) => {
        try {
            const transactionReceipt = await alchemy.core.getTransactionReceipt(hash);
            console.log(transactionReceipt);
            setSelectedTransaction(transactionReceipt);
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }
    };



    return (
        <div>
            <div className="">Block Number : {blockNumber}</div>
            {/* <div className="">Block : {block ? JSON.stringify(block) : ""}</div> */}
            <div className="">Block Hash : {blockHash}</div>
            <div><b>All Transactions of {blockNumber}:</b></div>
            <div className='allTransactionsMainClass'>
                {/* <div className='allTransactions_sub'>{allTransactions ? allTransactions[0].hash : ""}</div> */}
                <div className='allTransactions_sub'>
                    <table >
                        <thead className='allTransactions_tableHead'>
                            <tr>
                                <th>Transaction Hash</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTransactions ? allTransactions.map((index) => (
                                <tr key={index.hash}>
                                    <td>{index.hash}</td>
                                    <td>
                                        <button onClick={() => handleButtonClick(index.hash)}>View Details</button>
                                    </td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='selectedTransationMainClass'>
                {selectedTransaction && (
                    <>
                        <h2 className='selectedTransation_sub'>Transaction Details</h2>
                        <div className='selectedTransation_detailClass'>
                            <table>
                                <thead className='allTransactions_tableHead'>
                                    <tr>
                                        <th>Property</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Block Number:</b></td>
                                        <td>{selectedTransaction.blockNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Transaction Hash:</b></td>
                                        <td>{selectedTransaction.transactionHash}</td>
                                    </tr>
                                    <tr>
                                        <td><b>From:</b></td>
                                        <td>{selectedTransaction.from}</td>
                                    </tr>
                                    <tr>
                                        <td><b>To:</b></td>
                                        <td>{selectedTransaction.to}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gas Used:</b></td>
                                        <td>{parseInt(selectedTransaction.gasUsed._hex, 16)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

        </div >
    )
}

export default TransactionDetails



// import { Alchemy, Network } from 'alchemy-sdk';
// import { useEffect, useState } from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// const settings = {
//     apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
//     network: Network.ETH_MAINNET,
// };

// const alchemy = new Alchemy(settings);

// function TransactionDetails() {
//     const [block, setBlock] = useState();
//     const [blockNumber, setBlockNumber] = useState();
//     const [blockHash, setBlockHash] = useState();
//     const [transactions, setTransactions] = useState([]);
//     const [showTransactions, setShowTransactions] = useState(false);
//     const [selectedTransaction, setSelectedTransaction] = useState(null);

//     useEffect(() => {
//         async function getBlockData() {
//             const getBlock = await alchemy.core.getBlock();
//             console.log(getBlock);
//             setBlock(getBlock);

//             const getBlockNumber = getBlock.number;
//             console.log(getBlockNumber);
//             setBlockNumber(getBlockNumber);

//             const getBlockHash = getBlock.hash;
//             console.log(getBlockHash);
//             setBlockHash(getBlockHash);

//             const getBlockWithTransactions = await alchemy.core.getBlockWithTransactions(getBlockHash);
//             console.log(getBlockWithTransactions.transactions);
//             setTransactions(getBlockWithTransactions.transactions.slice(0, 10));
//         }

//         getBlockData();
//     }, []);

//     const handleGetBlockTransactions = () => {
//         setShowTransactions(true);
//     };

//     const handleButtonClick = async (hash) => {
//         try {
//             const transactionReceipt = await alchemy.core.getTransactionReceipt(hash);
//             console.log(transactionReceipt);
//             setSelectedTransaction(transactionReceipt);
//         } catch (error) {
//             console.error('Error fetching transaction details:', error);
//         }
//     };

//     return (
//         <>
//             <div className="App">
//                 <div>Block Number: {blockNumber}</div>
//                 <div>Block Hash: {blockHash}</div>

//                 <div>
//                     <button
//                         className="block_details"
//                         style={{ marginTop: '10px', fontSize: '1rem' }}
//                         onClick={handleGetBlockTransactions}
//                     >
//                         Get Block Transactions
//                     </button>

//                     <button
//                         className='account_balance_btn'
//                         style={{ marginTop: '10px', fontSize: '1rem', marginLeft: "10px" }}>
//                         GO TO THE ACCOUNT BALANCE PAGE</button>
//                 </div>

//                 {showTransactions && (
//                     <div style={{ marginTop: "100px", marginBottom: "100px" }}>
//                         <table >
//                             <thead>
//                                 <tr>
//                                     <th>Transaction Hash</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {transactions.map((transaction) => (
//                                     <tr key={transaction.hash}>
//                                         <td>{transaction.hash}</td>
//                                         <td>
//                                             <button onClick={() => handleButtonClick(transaction.hash)}>View Details</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {selectedTransaction && (
//                     <div style={{ marginBottom: "100px" }}>
//                         <h2>Transaction Details</h2>
//                         <table>
//                             <tbody>
//                                 <tr>
//                                     <th>Property</th>
//                                     <th>Value</th>
//                                 </tr>
//                                 <tr>
//                                     <td>Transaction Hash</td>
//                                     <td>{selectedTransaction.transactionHash}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Block Number</td>
//                                     <td>{selectedTransaction.blockNumber}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>From</td>
//                                     <td>{selectedTransaction.from}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>To</td>
//                                     <td>{selectedTransaction.to}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 <div style={{ marginTop: "100px" }}>
//                     <button>GO TO THE ACCOUNT BALANCE PAGE</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default TransactionDetails;
