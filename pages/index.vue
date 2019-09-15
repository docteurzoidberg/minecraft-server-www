<template>
  <div class="container">
    <div>
      <div>
        <h1 class="title minecrafter">
          <logo />TPPTEK-NG
        </h1>
        <h2 class="subtitle minecraftia">
          The modpack
        </h2>
        <div class="links">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            class="button--white"
          >
            Download launcher
          </a>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            class="button--white"
          >
            Join server
          </a>
          <nuxt-link to="/map" target="_blank" class="button--white">Map</nuxt-link>
        </div>
      </div>
      <div>
        <client-only>
          <server-status />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ServerStatus from '~/components/ServerStatus.vue'
export default {
  components: {
    Logo,
    ServerStatus
  }
}
</script>

<style>
body {
  background-attachment: fixed;
  background: url("../static/img/backgrounds/370455.jpg") no-repeat center center fixed;
  -webkit-background-size: cover; /* For WebKit*/
  -moz-background-size: cover;    /* Mozilla*/
  -o-background-size: cover;      /* Opera*/
  background-size: cover;         /* Generic*/
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.minecrafter {
  font-family: 'MineCrafter3Regular';
  font-weight: normal;
  font-style: normal;
}

.minecraftia {
  font-family: 'MinecraftiaRegular';
  font-weight: normal;
  font-style: normal;
}

.title {
  display: block;
  font-size: 100px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: white;
  letter-spacing: 1px;
  text-shadow: 0px 0px 18px black;
  opacity: .9;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #EEEEEE;
  word-spacing: 5px;
  padding-bottom: 15px;
  text-shadow: 0px 0px 4px black;
  opacity: 0.8;
}

.links {
  padding-top: 15px;
}
</style>
