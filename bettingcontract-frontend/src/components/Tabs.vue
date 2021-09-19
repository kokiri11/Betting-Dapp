<template>
  <article>
      <header class= "tabs">
          <ul>
              <li v-for= "(tab, index) in tabs" :key = "index">
                  <div class= "nav-item" :class="{'is-active': tab.isActive }" @click="selectTab(tab)">
                      {{tab.name}}

                  </div>

              </li>
          </ul>

      </header>

      <section class= "tabs-details">
          <slot> 

          </slot>
 
      </section>

  </article>
</template>

<script>
export default {
    data: () => {
        return {
            tabs: []
        }
    },

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = tab.name === selectedTab.name;
            })
        }
    },

    created() {
        this.tabs = this.$children;
    }   

}
</script>

<style lang="scss" scoped>

.tabs{
    margin: 0 15px;
    font-size: 25px;
    font-family:Arial, Helvetica, sans-serif;
    color: black;
    padding:16px;
    font-weight:bold;
    box-shadow:2px 2px 6px #888;  
    text-align:center;
    display:block;
    margin:16px;
}

.tabs-details{
    padding: 10px;
    
}

ul {
    display: flex;
    padding: 0;
    list-style: none;

}

li{
    margin-right: 40px;
}

.nav-item{
    cursor: pointer;

    &:hover  {
        color: #8800FF;
    }

    &:is-active  {
        color: #8800FF;
    } 
}



</style> 