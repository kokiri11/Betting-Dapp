<template>

<div>
  <h1>Want to create a bet ?</h1><br><br>

  <label for="BetReasonTextBox">Bet:</label><br>
  <input class="backGroundColor" type="text" id="BetReasonTextBox" name="BetReason" placeholder="What is the bet about ?"><br><br>

  <label for="AmountToBetTextBox">Amount you want to bet:</label><br>
  <input class="backGroundColor" type="number" id="AmountToBetTextBox" name="AmountToBet" placeholder="Amount to bet"><br><br>

  <label for="FirstAddressTextBox">First better:</label><br>
  <input class="backGroundColor" type="text" id="FirstAddressTextBox" name="FirstAddress" placeholder="First public address"><br><br>
 
  <label for="SecondAddressTextBox">Second better:</label><br>
  <input class="backGroundColor" type="text" id="SecondAddressTextBox" name="SecondAddress" placeholder="Second public address"><br><br>

  <label for="ThirdPartyTextBox">Thirdparty:</label><br>
  <input class="backGroundColor" type="text" id="ThirdAddressTextBox" name="ThirdAddress" placeholder="Thirdparty public address"><br><br>

  <button v-on:click= "createBet" class="backGroundColor button">Create bet</button>

  </div>
  
</template>

<script>

import Web3 from 'web3';
import BettingContract from '../abis/BettingContract.json';



export default
{

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

    async createBet(){

      const web3 = new Web3(window.ethereum);

      if (document.getElementById('BetReasonTextBox').value != "" 
       && document.getElementById('AmountToBetTextBox').value != ""
       && document.getElementById('FirstAddressTextBox').value != ""
       && document.getElementById('SecondAddressTextBox').value != ""
       && document.getElementById('ThirdAddressTextBox').value != "") {

          this.bettingContractAbi.methods.createBet(document.getElementById('BetReasonTextBox').value, 
          web3.utils.toWei(document.getElementById('AmountToBetTextBox').value, 'ether'),
          document.getElementById('FirstAddressTextBox').value,
          document.getElementById('SecondAddressTextBox').value,
          document.getElementById('ThirdAddressTextBox').value).send({from: "" + this.account});

          document.getElementById('BetReasonTextBox').value = "";
          document.getElementById('AmountToBetTextBox').value = "";
          document.getElementById('FirstAddressTextBox').value = "";
          document.getElementById('SecondAddressTextBox').value = "";
          document.getElementById('ThirdAddressTextBox').value = "";

        
          this.bettingContractAbi.methods.getLastBetId().call().then(result => alert("The bet has been successfully created. The bet Id is: " + result));

      } else {
        alert("Some informations are missing or you inputted wrong information!");
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


<style scoped>

</style>
