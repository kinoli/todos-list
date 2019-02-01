<template>
  <section class="todo-info">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar dark tabs flat color="teal">
            <v-btn id="btn-back" icon @click="onBack">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-toolbar-title>{{ details.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-tabs
            v-if="details && details.user"
            @change="onNewTab"
            v-model="active"
            color="teal"
            dark
            slider-color="yellow"
          >
            <v-tab
              v-for="tab in tabs"
              :key="'tab='+tab"
              ripple
              class="tab"
            >
              {{ tab }}
            </v-tab>
            <v-tab-item :key="tabs[0]">
              <v-card flat>
                <v-card-text>
                  <v-subheader>Todo info</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>ID</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.id }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Title</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.title }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Completed</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.completed }}</v-list-tile-action>
                  </v-list-tile>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="tabs[1]">
              <v-card flat>
                <v-card-text>
                  <v-subheader>User info</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>User ID</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.id }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Name</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.name }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Username</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.username }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Email</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.email }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Phone</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.phone }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Website</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.website }}</v-list-tile-action>
                  </v-list-tile>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="tabs[2]">
              <v-card flat>
                <v-card-text>
                  <v-subheader>Address</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Street</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.address.street }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>City</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.address.city }}</v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Zip code</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>{{ details.user.address.zipcode }}</v-list-tile-action>
                  </v-list-tile>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script lang="js">
export default {
  name: 'todo-info',
  mounted () {
    this.details = this.$store.getters.getTodoDetails(this.$route.params.id)
    this.active = this.$store.getters.getActiveTab
  },
  data: () => ({
    details: {},
    tabs: [
      'Todo',
      'User',
      'Address'
    ],
    active: null
  }),
  methods: {
    onBack () {
      this.$store.dispatch('SET_TAB', null)
      this.$router.go(-1)
    },
    onNewTab () {
      this.$store.dispatch('SET_TAB', this.active)
    }
  }
}
</script>
