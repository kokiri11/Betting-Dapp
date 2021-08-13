<template class= "wholePage">
  <div id="app">
    
    <Tabs>
      <Tab name= "Connect to metamask" selected = "True">
        <ConnectMetamaskPage/>
      </Tab>

      <Tab name= "Create a Bet">
        <BetForm/>
      </Tab>

      <Tab name =  "Approve a Bet">
        <ApproveBet/>
      </Tab>

      <Tab name =  "Transfer Funds to Bet">
        <TransferFunds/>
      </Tab>

      <Tab name =  "Perform a bet decision">
        <PerformBetDecision/>
      </Tab>

      <Tab name =  "Read Bet Data">
        <ReadBetInfo/>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import BetForm from './components/Start-a-Bet.vue'
import Tab from "./components/Tab.vue"
import Tabs from "./components/Tabs.vue"
import ApproveBet from "./components/Approve-a-Bet.vue"
import TransferFunds from "./components/Transfer-Funds-for-a-Bet.vue"
import PerformBetDecision from "./components/Perfrom-Bet-Decision.vue"
import ReadBetInfo from "./components/Read-Bet-Infos.vue"
import ConnectMetamaskPage from "./components/Hello-Page.vue"



  

export default {
  name: 'App',
  components: {
    BetForm,
    Tab, 
    Tabs,
    ApproveBet,
    TransferFunds,
    PerformBetDecision,
    ReadBetInfo,
    ConnectMetamaskPage,
  },

  methods: {

    

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

.backGroundColor{
  background-color: white;
}

.button{
  border-radius: 25px;
}

* {background-color: #CDC8DA}
</style>
