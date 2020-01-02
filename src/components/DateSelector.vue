<template>
  <b-field label="Select a date range">
    <b-datepicker
      expanded
      placeholder="Click to select..."
      v-model="dates"
      range>
    </b-datepicker>
  </b-field>
</template>

<script>
  export default {
    name: "DateSelector",
    computed: {
      dates: {
        get () {
          return this.$store.state.dates
        },
        set (value) {
          this.$store.commit('updateDates', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
