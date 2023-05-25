const secp = require("ethereum-cryptography/secp256k1");
// const {secp} = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
// const {keccak256} = require("ethereum-cryptography/keccak")

const privatekey = secp.utils.randomPrivateKey();
console.log("Private Key : ", toHex(privatekey));

// const publickey = keccak256(secp.secp256k1.getPublicKey(privatekey).slice(1)).slice(-20);
const publickey = secp.getPublicKey(privatekey);
console.log("Public Key :", toHex(publickey));

//Public: 045eee20c149d8cc1c464a90931a05e7937785879b63090ebd4904d40e5bfe484b633521db79014c7b2540329bdfbc02d01fdfa2a67cf0274944c1ef206ba2d72e
//Private: 061637a471aafd28eebf0387da33a9a66351cc80c6847654547a5ee19d06db07

//Public: 0461b06fc4a6e32eaadccda4c7e4ed81fffc4436be8ef23177d4c6b1b0f94e42e8fdc2aa429f9fd9aa7cbb475ab82b754ab4e79c7b8e506220230d9791c5b11357
//Private: b1d74df8319477483400a652774922f5f75bd8330b5aec54a55b88a3dddc5ce1

//Public: 04854cf49d0b506241fd55df19de8df630723154468560882e3f99ca559e75bdb9ac71dd9df4f14e7fe96f925515453dd4f3d4561e44459a4b85f193fdb9f2ece2
// Private: 0b6df5dde44b7cb7379fc9bb3330d212936b61d987defe72b320d5d30625ccef