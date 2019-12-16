<template>
  <nav class="columns">
    <div class="column has-text-centered">
      <b-taglist attached>
        <b-tag type="is-dark">Steam profile</b-tag>
        <b-tag type="is-info">
          <b-icon
            icon="steam"
            size="is-small">
          </b-icon>
        </b-tag>
      </b-taglist>
    </div>
    <div class="column has-text-centered">
      <div>
        <img :src="currentPlayer.avatar"/>
        <p class="heading">{{currentPlayer.nickname}}</p>
      </div>
    </div>
    <div class="column has-text-centered">
      <div>
        <img :src="comparePlayer.avatar"/>
        <p class="heading">{{comparePlayer.nickname}}</p>
      </div>
    </div>
    <div class="column has-text-centered">
      <b-taglist attached>
        <b-tag type="is-dark">Steam profile</b-tag>
        <b-tag type="is-info">
          <b-icon
            icon="steam"
            size="is-small">
          </b-icon>
        </b-tag>
      </b-taglist>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "ComparePlayers",
    computed: {
      ...mapGetters([
        'currentGame',
        'currentPlayer',
        'comparePlayer',
      ]),
    }
  }
</script>

<style scoped>

</style>
