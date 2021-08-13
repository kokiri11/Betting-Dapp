<template>
  <div>
  <h1>Want to transfer funds to winner ?</h1><br><br>

  <label for="PerformDecisionBetIdBox">Bet to perform decision on:</label><br>
  <input class="backGroundColor" type="number" id="PerformDecisionBetIdBox" name="PerformDecisionBetIdBox" placeholder="Id of the bet"><br><br>

  <label for="PerformDecisionWinnerAddressBox">Winner  address:</label><br>
  <input class="backGroundColor" type="text" id="PerformDecisionWinnerAddressBox" name="PerformDecisionWinnerAddressBox" placeholder="Winner's public address"><br><br>

  <button v-on:click= "performBetDecision" class="backGroundColor button">Perform Decision</button>

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


  methods:{
    performBetDecision: async function() {

      const BN = require('bn.js');

      if(document.getElementById("PerformDecisionBetIdBox").value != "" && document.getElementById("PerformDecisionWinnerAddressBox").value != "" && document.getElementById("PerformDecisionBetIdBox").value >= 0) {

        var thirdParty;
        await this.bettingContractAbi.methods.getBetThirdParty(document.getElementById("PerformDecisionBetIdBox").value).call().then(result => thirdParty = result);

        if(this.account === thirdParty){

          var valueToGive;
          await this.bettingContractAbi.methods.getBetAmount(document.getElementById("PerformDecisionBetIdBox").value).call().then(function(result) {valueToGive = new BN(result).mul(new BN(2))});
      
          
          this.bettingContractAbi.methods.performBetDecision(document.getElementById("PerformDecisionBetIdBox").value, document.getElementById("PerformDecisionWinnerAddressBox").value).send({from: this.account, value: valueToGive})

        } else { alert("It seems like you are trying to transfer funds to the winner of the bet with an account that is not registered as a the thirdparty in this bet. Please try changing to an address registered (if it is not already the case) AND THEN reload the page :)")}
        

        document.getElementById("PerformDecisionBetIdBox").value = ""; 
        document.getElementById("PerformDecisionWinnerAddressBox").value = "";
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