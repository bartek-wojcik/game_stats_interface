<template>
  <b-button @click="updateStore">Test</b-button>
</template>

<script>
  export default {
    name: "TestButton",
    methods: {
      updateStore: function() {
        this.$store.commit('increment');
        // eslint-disable-next-line no-console
        console.log(this.$store.state.count);
      }
    }
  }
</script>

<style scoped>

</style>
