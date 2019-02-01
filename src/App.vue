<template>
  <v-app>
    <v-content v-if="loaded">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('INIT').then(() => {
      this.loaded = true
    })
  },
  data: () => ({
    loaded: false
  })
}
</script>

<style scoped lang="scss">
  #app {
    padding: 20px 0;
  }
</style>
