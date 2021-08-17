<template>
  <div> 
    <h1>Want to approve a bet ?</h1><br><br>

    <label for="ApproveBetBox">Approve a bet:</label><br>
    <input class="backGroundColor" type="number" id="ApproveBetBox" name="ApproveBetBox" placeholder="Id of the bet"><br><br>
    

    <button class="backGroundColor button" v-on:click= "approveBet">Approve Bet</button>
  </div>
</template>

<script>

export default {

  methods: {

    approveBet: async function() {

      if(document.getElementById('ApproveBetBox').value != "" && document.getElementById('ApproveBetBox').value >= 0){

        

        var firstBetter;
        await this.$store.bettingContractAbi.methods.getBetFirstBetter(document.getElementById("ApproveBetBox").value).call().then(result => firstBetter = result);

        var secondBetter;
        await this.$store.bettingContractAbi.methods.getBetSecondtBetter(document.getElementById("ApproveBetBox").value).call().then(result => secondBetter = result);

        var thirdParty;
        await this.$store.bettingContractAbi.methods.getBetThirdParty(document.getElementById("ApproveBetBox").value).call().then(result => thirdParty = result);

        if(this.$store.account === firstBetter || this.$store.account === secondBetter || this.$store.account === thirdParty) {

          this.$store.bettingContractAbi.methods.approveBet(document.getElementById('ApproveBetBox').value).send({from: ""+this.$store.account});
          document.getElementById('ApproveBetBox').value = "";

        } else { alert("It seems like you are trying to approve a bet with an address that is not registered in this bet! Please try changing to an address registered (if it is not already the case) AND THEN reload the page :)")}

      } else {

        alert('Some informations are missing or you inputted wrong information');

      }

    },
    
  }

}
</script>

<style>


</style>