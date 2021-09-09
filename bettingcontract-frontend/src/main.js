import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import Web3 from 'web3';
import BettingContract from './abis/BettingContract.json';


Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    account: '0x0',
    contractAddress: "0x0",
    bettingContractAbi: 0,
  },
  mutations: {

    async loadAccounts(){

      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0]

      console.log(this.account)

    },

    async importSmartContract(){

      await window.ethereum.send('eth_requestAccounts');
      
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0]
      
      const netId = window.ethereum.networkVersion;

      console.log(netId)
      
      const bettingContractData = BettingContract.networks[netId];

      console.log(bettingContractData)
    
      if(bettingContractData){
        const finalBettingContract = new web3.eth.Contract(BettingContract.abi, bettingContractData.address);
        console.log(bettingContractData.address);
        this.contractAddress = bettingContractData.address;
        this.bettingContractAbi = finalBettingContract;
      }else{
        window.alert('Betting smart contract has not been deployed to detected network');
      }
      
    },
    
  }
})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
