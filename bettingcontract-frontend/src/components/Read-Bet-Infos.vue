<template>
  <div>
  <h1>Want to read information from a bet ?</h1><br><br>

  <label for="GetBetSubject">Get the subject of a bet:</label><br>
  <input class="backGroundColor" type="number" id="GetBetSubject" name="GetBetSubject" placeholder="Id of the bet"><br><br>

  <button v-on:click="getBetSubject" class="backGroundColor button" >Get the subject</button><br><br>

  <label for="GetBetAmount">Get the amount at stake in a bet:</label><br>
  <input class="backGroundColor" type="number" id="GetBetAmount" name="GetBetAmount" placeholder="Id of the bet"><br><br>

  <button v-on:click="getBetAmount" class="backGroundColor button">Get bet amount</button><br><br>

  <label for="GetFirstBetter">Get the address of the first better:</label><br>
  <input class="backGroundColor" type="number" id="GetFirstBetter" name="GetFirstBetter" placeholder="Id of the bet"><br><br>

  <button v-on:click="getFirstBetter" class="backGroundColor button">Get address </button><br><br>

  <label for="GetSecondBetter">Get the address of the second better:</label><br>
  <input class="backGroundColor" type="number" id="GetSecondBetter" name="GetSecondBetter" placeholder="Id of the bet"><br><br>

  <button v-on:click="getSecondBetter" class="backGroundColor button">Get address </button><br><br>

  <label for="GetThirdParty">Get the address of the ThirdParty:</label><br>
  <input class="backGroundColor" type="number" id="GetThirdParty" name="GetThirdParty" placeholder="Id of the bet"><br><br>

  <button v-on:click="getThirdParty" class="backGroundColor button">Get address </button><br><br>

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

    getBetSubject: function() {
      if(document.getElementById("GetBetSubject").value != "" && document.getElementById("GetBetSubject").value >= 0) {

        this.bettingContractAbi.methods.getBetReason(document.getElementById("GetBetSubject").value).call().then( result => alert("The bet is about: " + result));
        document.getElementById("GetBetSubject").value = ""; 

       } else {
        alert("Some informations are missing or you inputted wrong information");
      }
    },

    getBetAmount: function() {
      if(document.getElementById("GetBetAmount").value != "" && document.getElementById("GetBetAmount").value >= 0) {

        this.bettingContractAbi.methods.getBetAmount(document.getElementById("GetBetAmount").value).call().then(result => alert("The amount is " + result / 10**18+ " ether(s)"));
        document.getElementById("GetBetAmount").value = ""; 

       } else {
        alert("Some informations are missing or you inputted wrong information");
      }
    },

    getFirstBetter: function() {
      if(document.getElementById("GetFirstBetter").value != "" && document.getElementById("GetFirstBetter").value >= 0) {
        this.bettingContractAbi.methods.getBetFirstBetter(document.getElementById("GetFirstBetter").value).call().then(result => alert("The first better address is: " + result));
        document.getElementById("GetFirstBetter").value = ""; 
       } else {
        alert("Some informations are missing or you inputted wrong information");
      }
    },

    getSecondBetter: function() {
      if(document.getElementById("GetSecondBetter").value != "" && document.getElementById("GetSecondBetter").value >= 0) {
        this.bettingContractAbi.methods.getBetSecondtBetter(document.getElementById("GetSecondBetter").value).call().then(result => alert("The second better address is: " + result))
        document.getElementById("GetSecondBetter").value = ""; 
       } else {
        alert("Some informations are missing or you inputted wrong information");
      }
    },

    getThirdParty: function() {
      if(document.getElementById("GetThirdParty").value != "" && document.getElementById("GetThirdParty").value >= 0) {
        this.bettingContractAbi.methods.getBetThirdParty(document.getElementById("GetThirdParty").value).call().then(result => alert("The thirdparty address is: " + result))
        document.getElementById("GetThirdParty").value = ""; 
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