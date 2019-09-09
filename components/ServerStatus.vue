<template>
  <div class="status">
    <div v-if="status">
      <img class="servericon" :src="status.favicon">
      <div class="motd" v-html="motdhtml" />
      <div class="playercount">
        <span v-text="status.players.online" />/<span v-text="status.players.max" />
      </div>
    </div>
    <div v-if="status">
      <div v-if="status.players.sample">
        Joueurs connect&eacute;s:
        <div class="players">
          <ServerStatusPlayer v-for="player in status.players.sample" :key="player.id" :player="player" />
        </div>
      </div>
      <div v-else>
        Aucun joueur connecte
      </div>
    </div>
  </div>
</template>

<style scoped>
.status {
  margin-top: 20px;
  color: white;
}
.servericon, .motd {
  float: left;
}
.motd, .servericon, .playercount {
  height: 72px;
}
.playercount {
  line-height: 72px;
  font-family: Minecraft;
}
</style>

<script>
import mcmotdparser from '~/plugins/mcmotdparser'
import ServerStatusPlayer from '~/components/ServerStatusPlayer'

export default {
  components: {
    ServerStatusPlayer
  },
  data () {
    return {
      motdhtml: false,
      status: false,
      timer: null
    }
  },
  created () {
    this.timer = setInterval(this.fetchStatus, 5 * 1000)
    this.fetchStatus()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    async fetchStatus () {
      this.status = await this.$axios.$get('api/status')
      this.parseMotd()
    },
    cancelFetch () {
      clearInterval(this.timer)
    },
    parseMotd () {
      const self = this
      mcmotdparser.toHtml(self.status.description.text, (err, res) => {
        if (err) {
          console.error(err)
          return
        }
        self.motdhtml = res
      })
    }
  }
}
</script>
