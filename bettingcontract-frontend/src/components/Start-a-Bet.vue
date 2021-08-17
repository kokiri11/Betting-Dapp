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



export default
{
  methods: {

    async createBet(){

      const web3 = new Web3(window.ethereum);

      if (document.getElementById('BetReasonTextBox').value != "" 
       && document.getElementById('AmountToBetTextBox').value != ""
       && document.getElementById('FirstAddressTextBox').value != ""
       && document.getElementById('SecondAddressTextBox').value != ""
       && document.getElementById('ThirdAddressTextBox').value != "") {

          this.$store.bettingContractAbi.methods.createBet(document.getElementById('BetReasonTextBox').value, 
          web3.utils.toWei(document.getElementById('AmountToBetTextBox').value, 'ether'),
          document.getElementById('FirstAddressTextBox').value,
          document.getElementById('SecondAddressTextBox').value,
          document.getElementById('ThirdAddressTextBox').value).send({from: "" + this.$store.account});

          document.getElementById('BetReasonTextBox').value = "";
          document.getElementById('AmountToBetTextBox').value = "";
          document.getElementById('FirstAddressTextBox').value = "";
          document.getElementById('SecondAddressTextBox').value = "";
          document.getElementById('ThirdAddressTextBox').value = "";

        
          this.$store.bettingContractAbi.methods.getLastBetId().call().then(result => alert("The bet has been successfully created. The bet Id is: " + result));

      } else {
        alert("Some informations are missing or you inputted wrong information!");
      }

    },
  
  }

}
</script>


<style scoped>

</style>
