<template>
  <div class="player">
    <img :src="'https://minotar.net/avatar/' + player.id + '/16'">
    <span v-text="player.name" />
  </div>
</template>

<script>
export default {
  props: ['player'],
  data () {
    return {
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
