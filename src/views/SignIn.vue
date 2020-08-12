<template>
  <v-card width="500" class="mx-auto mt-5">
    <v-card-title class="headline">
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field 
          label="Email"
          prepend-icon="mdi-account-circle" 
          v-model="form.email"
        />
        <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"          
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" 
        @click="submit()"> Sign in
      </v-btn>
    </v-card-actions>
  </v-card>   
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'signin',
  data: () => ({
    showPassword: false,
    form: {
      email: 'alex@gmail.com',
      password: '12345',
    },
  }),
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),

    submit() {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: 'mainPage'
        })
      })
    }
    
  }
  
}
</script>