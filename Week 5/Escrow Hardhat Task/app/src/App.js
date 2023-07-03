import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { deploy, instanceEscrowContract } from './deploy';
import Escrow from './Escrow';
import Tabs from './Tabs'

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer, arbiter) {
  const addressSigner = await signer.getAddress();
  if (addressSigner !== arbiter) return toast.error('wallet no is arbiter');

  escrowContract.connect(signer).approve().then((approveTxn) => {
    approveTxn.wait(1).then(response => {
      toast.success(`tx: ${response.transactionHash}`)
    }).catch(error => {
      toast.error(error.reason)
    });
  }).catch(error => {
    toast.error(error.reason)
  });
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  window.ethereum.on('accountsChanged', (accounts) => {
    setAccount(accounts[0])
  });

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;

    if (arbiter === "") return toast.error('arbiter was not provided')
    if (arbiter.length < 42) return toast.error('arbiter address invalid')
    if (beneficiary === "") return toast.error('beneficiary was not provided')
    if (beneficiary.length < 42) return toast.error('beneficiary address invalid')

    if (document.getElementById('wei').value === "") return toast.error('value dont was provides')

    const value = ethers.utils.parseEther(`${document.getElementById('wei').value}`);

    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    console.log("escrowContract.address:- ", escrowContract.address)
    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: `${ethers.utils.formatEther(value.toString())}`,
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer, arbiter);
      },
    };

    const isIncludeEscrow = escrows.findIndex(escrowItem => escrowItem.address === escrow.address);

    if (isIncludeEscrow === -1) {
      setEscrows([...escrows, escrow]);
    } else {
      toast.info('Escrow has already been inserted')
    }
  }

  async function searchContract() {
    const contractAddress = document.getElementById('contract').value;

    if (contractAddress === "") return toast.error('contract address was not provided')

    const escrowContract = await instanceEscrowContract(contractAddress, signer);

    const valueContract = await Promise.all([escrowContract.arbiter(), escrowContract.beneficiary(), provider.getBalance(escrowContract.address)])

    const escrow = {
      address: contractAddress,
      arbiter: valueContract[0],
      beneficiary: valueContract[1],
      value: `${ethers.utils.formatEther(valueContract[2].toString())}`,
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer, valueContract[0]);
      },
    };

    const isIncludeEscrow = escrows.findIndex(escrowItem => escrowItem.address === escrow.address);

    if (isIncludeEscrow === -1) {
      setEscrows([...escrows, escrow]);
    } else {
      toast.info('Escrow has already been inserted')
    }
  }

  const NewContract = () => {
    return (
      <>
        <div className="contract">
          <h1> New Contract: </h1>
          <label>
            Arbiter Address:
            <input type="text" id="arbiter" />
          </label>

          <label>
            Beneficiary Address:
            <input type="text" id="beneficiary" />
          </label>

          <label>
            Deposit Amount (in Ether):
            <input type="text" id="wei" />
          </label>

          <div
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();

              newContract();
            }}
          >
            Deploy
          </div>
        </div>

        <div className="existing-contracts">
          <h1> Existing Contracts: </h1>

          <div id="container">
            {escrows.map((escrow) => {
              return <Escrow key={escrow.address} {...escrow} />;
            })}
          </div>
        </div>
      </>
    )
  }

  const SearchContract = () => {
    return (
      <>
        <div className="contract">
          <h1> Search Contract: </h1>
          <label>
            Contract Address:
            <input type="text" id="contract" />
          </label>

          <div
            className="button"
            id="Search"
            onClick={(e) => {
              e.preventDefault();

              searchContract();
            }}
          >
            Search
          </div>
        </div>

        <div className="existing-contracts">
          <h1> Existing Contracts: </h1>

          <div id="container">
            {escrows.map((escrow) => {
              return <Escrow key={escrow.address} {...escrow} />;
            })}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Tabs tabNames={["New Contract", "Search Contract"]} tabContents={[<NewContract />, <SearchContract />]} />
    </>
  );
}

export default App;





// import { ethers } from 'ethers';
// import { useEffect, useState } from 'react';
// import deploy from './deploy';
// import Escrow from './Escrow';

// const provider = new ethers.providers.Web3Provider(window.ethereum);

// export async function approve(escrowContract, signer) {
//   const approveTxn = await escrowContract.connect(signer).approve();
//   await approveTxn.wait();
// }

// function App() {
//   const [escrows, setEscrows] = useState([]);
//   const [account, setAccount] = useState();
//   const [signer, setSigner] = useState();

//   useEffect(() => {
//     async function getAccounts() {
//       const accounts = await provider.send('eth_requestAccounts', []);

//       setAccount(accounts[0]);
//       setSigner(provider.getSigner());
//     }

//     getAccounts();
//   }, [account]);

//   async function newContract() {
//     const beneficiary = document.getElementById('beneficiary').value;
//     const arbiter = document.getElementById('arbiter').value;
//     // const value = ethers.BigNumber.from(document.getElementById('wei').value);
//     const value = ethers.utils.parseEther(`${document.getElementById('wei').value}`);
//     const escrowContract = await deploy(signer, arbiter, beneficiary, value);

//     const escrow = {
//       address: escrowContract.address,
//       arbiter,
//       beneficiary,
//       // value: value.toString(),
//       value: `${ethers.utils.formatEther(value.toString())}`,
//       handleApprove: async () => {
//         escrowContract.on('Approved', () => {
//           document.getElementById(escrowContract.address).className =
//             'complete';
//           document.getElementById(escrowContract.address).innerText =
//             "✓ It's been approved!";
//         });

//         await approve(escrowContract, signer);
//       },
//     };

//     setEscrows([...escrows, escrow]);
//   }

//   return (
//     <>
//       <div className="contract">
//         <h1> New Contract </h1>
//         <label>
//           Arbiter Address
//           <input type="text" id="arbiter" />
//         </label>

//         <label>
//           Beneficiary Address
//           <input type="text" id="beneficiary" />
//         </label>

//         <label>
//           Deposit Amount (in Wei)
//           <input type="text" id="wei" />
//         </label>

//         <div
//           className="button"
//           id="deploy"
//           onClick={(e) => {
//             e.preventDefault();

//             newContract();
//           }}
//         >
//           Deploy
//         </div>
//       </div>

//       <div className="existing-contracts">
//         <h1> Existing Contracts </h1>

//         <div id="container">
//           {escrows.map((escrow) => {
//             return <Escrow key={escrow.address} {...escrow} />;
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;







// import { ethers } from 'ethers';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Escrow from './Escrow';
// import deploy from './deploy';

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const serverBaseUrl = 'http://localhost:8000'; // Replace with your server's base URL

// export async function approve(escrowContract, signer) {
//   const approveTxn = await escrowContract.connect(signer).approve();
//   await approveTxn.wait();
// }

// function App() {
//   const [escrows, setEscrows] = useState([]);
//   const [account, setAccount] = useState();
//   const [signer, setSigner] = useState();

//   useEffect(() => {
//     async function getAccounts() {
//       const accounts = await provider.send('eth_requestAccounts', []);
//       setAccount(accounts[0]);
//       setSigner(provider.getSigner());
//     }

//     getAccounts();
//   }, []);

//   useEffect(() => {
//     async function fetchEscrows() {
//       try {
//         const response = await axios.get(`${serverBaseUrl}/escrows`);
//         setEscrows(response.data);
//       } catch (error) {
//         console.error('Error fetching escrows:', error);
//       }
//     }

//     fetchEscrows();
//   }, []);

//   async function newContract() {
//     const beneficiary = document.getElementById('beneficiary').value;
//     const arbiter = document.getElementById('arbiter').value;
//     const value = ethers.utils.parseEther(`${document.getElementById('wei').value}`);

//     try {
//       const response = await axios.post(`${serverBaseUrl}/deploy`, {
//         arbiter,
//         beneficiary,
//         value: value.toString(),
//       });

//       const escrow = {
//         address: response.data.address,
//         arbiter,
//         beneficiary,
//         value: ethers.utils.formatEther(value.toString()),
//         handleApprove: async () => {
//           // Approve logic...
//         },
//       };

//       setEscrows([...escrows, escrow]);
//     } catch (error) {
//       console.error('Error deploying contract:', error);
//     }
//   }

//   return (
//     <>
//       <div className="contract">
//         <h1> New Contract </h1>
//         <label>
//           Arbiter Address
//           <input type="text" id="arbiter" />
//         </label>

//         <label>
//           Beneficiary Address
//           <input type="text" id="beneficiary" />
//         </label>

//         <label>
//           Deposit Amount (in Wei)
//           <input type="text" id="wei" />
//         </label>

//         <div
//           className="button"
//           id="deploy"
//           onClick={(e) => {
//             e.preventDefault();

//             newContract();
//           }}
//         >
//           Deploy
//         </div>
//       </div>

//       <div className="existing-contracts">
//         <h1> Existing Contracts </h1>

//         <div id="container">
//           {escrows.map((escrow) => {
//             return <Escrow key={escrow.address} {...escrow} />;
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
