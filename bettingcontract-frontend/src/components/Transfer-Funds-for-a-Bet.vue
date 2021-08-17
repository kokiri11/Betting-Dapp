<template>
   <div> 

    <h1>Want to transfer funds to ThirdParty ?</h1><br><br>

    <label for="TransferFundsBox">Transfer your funds to Thirdparty:</label><br>
    <input class="backGroundColor" type="number" id="TransferFundsBox" name="TransferFundsBox" placeholder="Id of the bet"><br><br>
    

    <button v-on:click= "transferFunds" class="backGroundColor button">Transfer Funds</button>
  </div>
</template>

<script>

export default {

  methods: {

    transferFunds: async function() {
      if(document.getElementById("TransferFundsBox").value != "" && document.getElementById("TransferFundsBox").value >= 0) {

        var firstBetter;
        await this.$store.bettingContractAbi.methods.getBetFirstBetter(document.getElementById("TransferFundsBox").value).call().then(result => firstBetter = result);

        var secondBetter;
        await this.$store.bettingContractAbi.methods.getBetSecondtBetter(document.getElementById("TransferFundsBox").value).call().then(result => secondBetter = result);

        if(this.$store.account === firstBetter || this.$store.account === secondBetter){

          var valueToBet;
          await this.$store.bettingContractAbi.methods.getBetAmount(document.getElementById("TransferFundsBox").value).call().then(function(result){valueToBet = result});

          this.$store.bettingContractAbi.methods.transferFundsForBet(document.getElementById("TransferFundsBox").value).send({from: this.$store.account, value : valueToBet})
          document.getElementById("TransferFundsBox").value = ""; 

        } else { alert("It seems like you are trying to transfer funds to the thirdparty of the bet with an account that is not registered as a better in this bet. Please try changing to an address registered (if it is not already the case) AND THEN reload the page :)")}

      } else {
        alert("Some informations are missing or you inputted wrong information");
      }
    },

  }

}
</script>

<style>

</style>