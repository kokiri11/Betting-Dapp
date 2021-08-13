<template>
   <div> 

    <h1>Want to transfer funds to ThirdParty ?</h1><br><br>

    <label for="TransferFundsBox">Transfer your funds to Thirdparty:</label><br>
    <input class="backGroundColor" type="number" id="TransferFundsBox" name="TransferFundsBox" placeholder="Id of the bet"><br><br>
    

    <button v-on:click= "transferFunds" class="backGroundColor button">Transfer Funds</button>
  </div>
</template>

<script>

import Web3 from 'web3';
import BettingContract from '../abis/BettingContract.json';

export default {
  
  data() {
    return {
      account: '0x0',
      admin: '0x0',
      currentBalance: 0,
      bettingContractAbi: 0,
    };
  },

  async beforeMount(){
     await this.importSmartContract();
  },  

  methods: {

    transferFunds: async function() {
      if(document.getElementById("TransferFundsBox").value != "" && document.getElementById("TransferFundsBox").value >= 0) {

        var firstBetter;
        await this.bettingContractAbi.methods.getBetFirstBetter(document.getElementById("TransferFundsBox").value).call().then(result => firstBetter = result);

        var secondBetter;
        await this.bettingContractAbi.methods.getBetSecondtBetter(document.getElementById("TransferFundsBox").value).call().then(result => secondBetter = result);

        if(this.account === firstBetter || this.account === secondBetter){

          var valueToBet;
          await this.bettingContractAbi.methods.getBetAmount(document.getElementById("TransferFundsBox").value).call().then(function(result){valueToBet = result});

          this.bettingContractAbi.methods.transferFundsForBet(document.getElementById("TransferFundsBox").value).send({from: this.account, value : valueToBet})
          document.getElementById("TransferFundsBox").value = ""; 

        } else { alert("It seems like you are trying to transfer funds to the thirdparty of the bet with an account that is not registered as a better in this bet. Please try changing to an address registered (if it is not already the case) AND THEN reload the page :)")}

      } else {
        alert("Some informations are missing or you inputted wrong information");
      }
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
        this.bettingContractAbi = finalBettingContract;
      }else{
        window.alert('Betting smart contract has not been deployed to detected network');
      }

    },
    

  }

}
</script>

<style>

</style>