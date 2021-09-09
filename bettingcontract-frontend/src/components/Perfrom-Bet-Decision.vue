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


export default {


  methods:{
    performBetDecision: async function() {

      const BN = require('bn.js');

      if(document.getElementById("PerformDecisionBetIdBox").value != "" && document.getElementById("PerformDecisionWinnerAddressBox").value != "" && document.getElementById("PerformDecisionBetIdBox").value >= 0) {

        var thirdParty;
        await this.$store.bettingContractAbi.methods.getBetThirdParty(document.getElementById("PerformDecisionBetIdBox").value).call().then(result => thirdParty = result);

        if(this.$store.account === thirdParty){

          var valueToGive;
          await this.$store.bettingContractAbi.methods.getBetAmount(document.getElementById("PerformDecisionBetIdBox").value).call().then(function(result) {valueToGive = new BN(result).mul(new BN(2))});
      
          console.log(document.getElementById("PerformDecisionWinnerAddressBox").value);
          this.$store.bettingContractAbi.methods.performBetDecision(document.getElementById("PerformDecisionBetIdBox").value, document.getElementById("PerformDecisionWinnerAddressBox").value).send({from: this.$store.account, value: valueToGive})

        } else { alert("It seems like you are trying to transfer funds to the winner of the bet with an account that is not registered as a the thirdparty in this bet. Please try changing to an address registered (if it is not already the case) AND THEN reload the page :)")}
        

        document.getElementById("PerformDecisionBetIdBox").value = ""; 
        document.getElementById("PerformDecisionWinnerAddressBox").value = "";
      } else {
        alert("Some informations are missing or you inputted wrong information");
      }
    },
    
  }

}
</script>

<style>

</style>