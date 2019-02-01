<template lang="html">

  <section class="listing-row">
    <v-list-tile class="row-container" ripple @click="onClickRow(todo)">
      <v-list-tile-content>
        <v-list-tile-title class="row-title">{{ todo.title }}</v-list-tile-title>
        <v-list-tile-sub-title class="text--primary">{{ todo.user.company.name }}</v-list-tile-sub-title>
        <v-list-tile-sub-title class="row-name">{{ todo.user.name }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-list-tile-action-text class="row-username">{{ todo.user.username }}</v-list-tile-action-text>
        <v-icon class="row-star" v-if="todo.completed" color="yellow darken-2">
          star
        </v-icon>

        <v-icon v-else class="row-star" color="grey lighten-1">
          star_border
        </v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </section>

</template>

<script lang="js">
export default {
  name: 'listing-row',
  props: ['todo'],
  methods: {
    onClickRow (todo) {
      this.$router.push({ path: `/details/${todo.id}` })
    }
  }
}
</script>
