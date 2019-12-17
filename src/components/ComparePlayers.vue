<template>
  <section>
    <nav class="level">
      <div class="level-item" v-show="currentPlayer.id">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="currentPlayer.avatar">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <strong>{{currentPlayer.nickname}}</strong>
              <br>
              <div @click="openSteam(currentPlayer.id)">
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
            </div>
          </div>
        </article>
      </div>
      <div class="level-item" v-show="comparePlayer.id">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <strong>{{comparePlayer.nickname}}</strong>
              <br>
              <div @click="openSteam(comparePlayer.id)">
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
            </div>
          </div>
          <figure class="media-right">
            <p class="image is-64x64">
              <img :src="comparePlayer.avatar">
            </p>
          </figure>
        </article>
      </div>
    </nav>
    <!--    <nav class="level">-->
    <!--      <div class="level-item">-->
    <!--        Test1-->
    <!--      </div>-->
    <!--      <div class="level-item">-->
    <!--        Test2-->
    <!--      </div>-->
    <!--    </nav>-->
  </section>
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
    },
    methods: {
      openSteam: function (id) {
        window.open(`https://steamcommunity.com/profiles/${id}`, "_blank");
      }
    }
  }
</script>

<style scoped>

</style>
