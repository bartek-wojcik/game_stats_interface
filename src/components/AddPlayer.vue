<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add player</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Steam ID">
        <b-input
          type="numeric"
          v-model="playerId"
          placeholder="Your Steam ID"
          required>
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
      <button class="button is-primary" @click="addPlayer">Add</button>
      <p>{{message}}</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "AddPlayer",
    data: () => {
      return {
        message: '',
        playerId: null,
      }
    },
    methods: {
      addPlayer: function () {
        const self = this;
        this.$http.post('players', {id: this.playerId}).then(() => {
          self.message = 'Player successfully added, wait a while for data update'
        }).catch(() => {
          self.message = 'Player already exists'
        })
      }
    }
  }
</script>

<style scoped>

</style>
