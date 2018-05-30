<template>
  <div class="escape">
    <div id="preload">
        <img src="img/loading.gif" />
        <img src="img/loading-text.png" />
    </div>
    <div id="gameWindow">
        <canvas id="gjs-canvas"></canvas>
        <div id="gameEnd"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  props: {
    msg: String
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
