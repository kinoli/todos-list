<template lang="html">

  <section class="listing">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-xs-center">Todos</v-toolbar-title>

            <v-spacer />

            <v-switch
              id="completed-switch"
              label="Completed?"
              v-model="completed"
              @change="onFilterOrSortChanged"
              color="yellow"
              class="completed-switch mr-4 mt-2"
            ></v-switch>

            <v-text-field
              id="search-input"
              v-model="searchTerm"
              v-on:input="onFilterOrSortChanged"
              class="mt-2"
              flat
              label="Filter"
              prepend-inner-icon="search"
              solo-inverted
            ></v-text-field>
          </v-toolbar>

          <v-list two-line>
            <div v-for="(todo, index) in todos" :key="todo.id">
              <ListingRow class="l" :todo="todo" />
              <v-divider v-if="index + 1 < todos.length" :key="`divider-${index}`"></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </section>

</template>

<script lang="js">
import ListingRow from './ListingRow'

export default {
  name: 'listing',
  components: { ListingRow },
  mounted () {
    this.searchTerm = this.$store.getters.getSearchTerm
    this.completed = this.$store.getters.getCompletedToggle
    this.originalTodos = this.$store.getters.getTodosWithUsers
    this.todos = this.originalTodos

    const modifiedTodos = this.getSortCompleted()
    this.doSearch(modifiedTodos)
  },
  data: () => ({
    loaded: false,
    todos: [],
    users: [],
    originalTodos: [],
    searchTerm: '',
    completed: false
  }),
  methods: {
    onFilterOrSortChanged () {
      this.$store.dispatch('SET_COMPLETED_TOGGLE', this.completed)
      this.$store.dispatch('SET_SEARCH_TERM', this.searchTerm)

      const modifiedTodos = this.getSortCompleted()
      this.doSearch(modifiedTodos)
    },
    doSearch (modifiedTodos) {
      if (!this.searchTerm) {
        this.todos = modifiedTodos
      }
      this.todos = modifiedTodos.filter(t => {
        const lowerTerm = this.searchTerm.toLowerCase()
        if (
          t.title.toLowerCase().includes(lowerTerm) ||
          t.user.name.toLowerCase().includes(lowerTerm) ||
          t.user.username.toLowerCase().includes(lowerTerm) ||
          t.user.company.name.toLowerCase().includes(lowerTerm)
        ) {
          return true
        }
      })
    },
    getSortCompleted () {
      if (!this.completed) {
        return this.originalTodos
      }
      return this.originalTodos.filter(t => t.completed === this.completed)
    }
  }
}
</script>

<style lang="scss">
  .listing {
    .completed-switch {
      justify-content: flex-end;
      flex-grow: 0;

      .v-input__slot {
        margin-bottom: 0;
      }
    }
  }
</style>
