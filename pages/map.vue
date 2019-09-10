<template>
  <client-only>
    <div>
      <div id="mcmap" />
      <script>
        // console.log('initializing overviewer')
        document.body.onload = function() { overviewer.util.initialize() }
        // console.log('overviewer initialized')
      </script>
    </div>
  </client-only>
</template>

<style scoped>
#app {
    width: 100%;
    height: 100%;
}
.mcmap {
  position: absolute;
  left:0px;
  top:0px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.playerlist {
    position: absolute;
    top: 120px;
    right: 15px;
    width: 300px;
    border: 1px solid white;
    color: white;
    font-family: Arial, Sans-Serif;
    background-color: #1a1a1a;
}
.title {
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid white;
    margin: 0px;
    padding: 3px;
}
</style>

<script>

export default {
  layout: 'overviewer',
  bodyAttrs: { onload: 'overviewer.util.initialize()' },
  mounted () {
    if (process.browser && window.overviewer) {
      // overviewer.util.initialize()
    }
  }
}
</script>
