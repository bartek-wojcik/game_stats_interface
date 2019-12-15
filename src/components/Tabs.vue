<template>
  <b-tabs type="is-boxed" expanded @input="changeTab">
    <b-tab-item label="Global stats" icon="earth">
      <global-tab/>
    </b-tab-item>
    <b-tab-item label="Player stats" icon="account">
      <player-tab/>
    </b-tab-item>
    <b-tab-item label="Compare stats" icon="compare">
      <compare-tab/>
    </b-tab-item>
  </b-tabs>
</template>

<script>
  import CompareTab from "./CompareTab";
  import PlayerTab from "./PlayerTab";
  import GlobalTab from "./GlobalTab";
  export default {
    name: "Tabs",
    components: {GlobalTab, PlayerTab, CompareTab},
    methods: {
      changeTab: function (tabId) {
        this.$store.commit('updateCurrentTab',  tabId)
      }
    }
  }
</script>

<style scoped>

</style>
