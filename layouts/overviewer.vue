<template>
  <div id="app">
    <nuxt />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'TPPTEK web map',
      script: [
        { src: 'overviewerConfig.js', body: true, ssr: false },
        { src: 'overviewer.js', body: true, ssr: false },
        { src: 'baseMarkers.js', body: true, ssr: false },
        { src: 'leaflet.js', body: true, ssr: false }
      ],
      link: [
        { rel: 'stylesheet', href: 'leaflet.css' },
        { rel: 'stylesheet', href: 'overviewer.css' }
      ]
    }
  }
}
</script>
