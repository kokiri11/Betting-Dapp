<template>
  <div class='metamask-info'>

  <button class="backGroundColor button connectMetamaskButton" v-on:click= "connectButtonMetamask" id='connectMetamaskButton'>Connect Metamask</button><br><br>

  <h1 class="addressInfo"> Contract: {{this.contractAddress}} </h1>
  <h1 class="addressInfo"> Account currently selected: {{this.accountSelected}} </h1>
  <h1 class="addressInfo"> Current balance: {{this.accountBalance}} </h1>
  <h1 class="addressInfo"> Ids of the bets this account is involved in: {{this.IdOfBetsInvolved}} </h1>

  <h1 class="titles"> Hello :) This is a betting Dapp on blockchain. You can bet with your friends and trusted ones (or with strangers but I strongly don't recommend it)
    The functionning is pretty simple. Lets say that 2 people wish to bet some cryptocurrencies on blockchain. They need a thirdparty to manage funds until the outcome of the bet is known. There's how it works:
  </h1><br>

 <h1> 1 - Both betters decide who the thirdparty will be. Then, either a better or the thirdparty creates the bet (VERY IMPORTANT: A BET ID WILL BE DISPLAYED. PLEASE KEEP THE ID OF THE BET).</h1>
 <h1> 2 - Then, all users (both betters and the thirdparty) have to approve the bet by inputting the relevant bet Id.</h1>
 <h1> 3 - After that, all betters have to transfer the amount to bet to the thirdparty by inputting the Id of the bet. The funds will be transfered to the thirdparty's account. That is why betters have to choose VERY wisely the thirdparty. The thirdparty has no obligation to send the funds back or to not spend them!</h1>
 <h1> 4 - All the steps mentionned before need to be done BEFORE the outcome of the bet is known. When the outcome of the bet is known, the thirdparty can transfer the funds back to the winner! The bet is then finished!</h1><br><br>
 

 <h1 class="titles">Because this betting Dapp takes assets from blockchain, users will need a Metamask Wallet and a valid address! The "betters" and the "thirdparty" in reality correspond to wallet addresses! On the technical side, there are a few rules to follow to make the process easy. Here they are:</h1><br>

 <h1> 1 - If you attempt to do something that does not comply with the functionning of the Dapp, Metamask won't pop up to confirm transaction OR Metamask will warn you that there will be a transaction error due to an exception in the execution of the contract. Please consider that an action has indeed taken place if you click the confirm button of the Metamask PopUp AND Metamask does not warn you of a failure in the execution of the contract.</h1>
 <h1> 2 - Please try to connect only one address at a time on the Dapp. While it should work even if you connect multiple addresses, this may avoid possible unexpected concurrencies. </h1>


 </div>
 
</template>

<script>
import Web3 from "web3";
import BettingContract from '../abis/BettingContract.json';

export default {

data: () => {
        return {
          contractAddress: "",
          accountSelected: "",
          accountBalance: "",
          IdOfBetsInvolved: "",
        }
    },


  name: 'hello-metamask',

  mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.loadInformations();
                this.getBetsAddress();
            },100);
        })
    },

  methods: {

    async loadInformations(){
      
      const netId = window.ethereum.networkVersion;
      
      const bettingContractData = BettingContract.networks[netId];

      this.contractAddress = bettingContractData.address;

      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      this.accountSelected = accounts[0];

      await web3.eth.getBalance(accounts[0]).then(result => this.accountBalance = (result * 10 ** -18) + " native token(s)");
    },

    async getBetsAddress(){

      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();

      var yourAddress = accounts[0];

      var BetIdAssociatedAddress= "";

      var lastId;
      await this.$store.bettingContractAbi.methods.getLastBetId().call().then(function(result){lastId = result});

      var i = 0;

      while(i < lastId) {

        var firstAddress;
        var secondAddress;
        var thirdAddress;

        await this.$store.bettingContractAbi.methods.getBetFirstBetter(i).call().then(function(result){firstAddress = (result == yourAddress)});

        await this.$store.bettingContractAbi.methods.getBetSecondtBetter(i).call().then(function(result){secondAddress = (result == yourAddress)});

        await this.$store.bettingContractAbi.methods.getBetThirdParty(i).call().then(function(result){thirdAddress = (result == yourAddress)});

        console.log(firstAddress)
        console.log(secondAddress)
        console.log(thirdAddress)

        if(firstAddress || secondAddress || thirdAddress){

          BetIdAssociatedAddress = BetIdAssociatedAddress + " " + i + ",";

        }

        i++;
      }

      this.IdOfBetsInvolved = BetIdAssociatedAddress;

    },

    async loadWeb3(){

      // Setup Web3 si Metask est présent
      if(window.ethereum){
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()        
        // Pas sûr de ce que ça fait j'avoue
      } else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider)          
      } else {
        // S'affiche s'il n'y a pas de Metamask
        window.alert('Non-Ethereum browser detected. Please download Metamask')        
      }
    
    },

     connectButtonMetamask: async function (){
      await this.loadWeb3();
    },

  
  }

}
</script>

<style>

.titles {
  font-size: 20px;
  font-family:Arial, Helvetica, sans-serif;
  color: black;
  padding:16px;
  font-weight:bold;
  box-shadow:2px 2px 6px #888;  
  text-align:center;
  display:block;
  margin:16px;
}

.connectMetamaskButton{
  height: 50px; 
  width: 175px; 
}

.addressInfo{
  color: #60100B;
}

</style>