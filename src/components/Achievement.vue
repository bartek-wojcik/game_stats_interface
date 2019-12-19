<template>
  <b-tooltip class="full-width" :label="item.description" top multilined>
      <div class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="item.icon">
          </p>
        </figure>
        <div class="media-content">
          <div class="content" style="min-width: 300px">
              <strong>{{item.display_name}}</strong>
              <br>
              <b-progress size="is-medium" type="is-black" :value="item.global_percent" show-value format="percent"/>
          </div>
        </div>
      </div>
  </b-tooltip>
</template>

<script>
  export default {
    name: "Achievement",
    props: ['item'],
  }
</script>

<style scoped>
  .full-width {
    width: 100% !important;
  }
</style>
