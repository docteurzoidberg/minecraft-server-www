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
      <div v-if="status.players.sample && status.players.sample.length > 0">
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
import socket from '~/plugins/socketio'
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
  mounted () {
    const self = this
    socket.on('status', function (data) {
      console.log('Socket event:')
      console.dir(data)
      self.status = data
      self.parseMotd()
    })
  },
  methods: {
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
