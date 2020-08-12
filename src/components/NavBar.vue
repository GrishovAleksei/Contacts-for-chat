<template>
  <v-app-bar class="navbar" dark>
    <v-btn text to="/">Home</v-btn>
    <v-spacer></v-spacer>
    
    <div v-if="authenticated">
      <v-row class="mr-3" align="center">
        <!-- <v-btn text>My profile</v-btn> -->
        <v-btn text @click="signOut"><v-icon class="mr-2">mdi-logout-variant</v-icon>Logout</v-btn>
        <v-avatar class="mr-2" size="20">
          <v-img  :src="user.photo"/>
        </v-avatar>
        {{ user.email }}
      </v-row>
      
    </div>
    <div v-else>
      <v-btn text to="/SignIn"><v-icon class="mr-2">mdi-login-variant</v-icon>Sign in</v-btn>
      <!-- <v-btn text to="/register">Register</v-btn> -->
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },

  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'signIn'
        })
      })
    }
  }
 
};
</script>

<style>
  .navbar {
    max-height: 65px;
  }
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 72px)
  }
  .avatar {
    height: 15px;
    max-width: 15px;
    border-radius: 0px;
  }
</style>