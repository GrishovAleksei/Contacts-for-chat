<template>
  <v-dialog v-model="dialog" max-width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="success ma-3" v-bind="attrs" v-on="on">
        <v-icon class="mr-2">mdi-account-plus</v-icon>
        Add new contact
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Add a new contact</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" class="px-3" ref="form">
          <v-text-field label="First Name" type="text"
            v-model="person.firstName" 
            prepend-icon="mdi-card-account-details"
            :rules="textRules" hide-details="auto"
            required>
          </v-text-field>
          <v-text-field label="Last Name" type="text"
            v-model="person.lastName"
            ref="person.lastName"
            prepend-icon="mdi-card-account-details"
            :rules="textRules" hide-details="auto"
            required>
          </v-text-field>
          <v-text-field label="Email" type="email"
            v-model="person.email"
            ref="person.email"
            prepend-icon="mdi-email"
            :rules="emailRules"
            required>
          </v-text-field>
          <v-text-field label="Phone" type="number"
            v-model="person.phone"
            ref="person.phone"
            prepend-icon="mdi-phone" required
            :rules="phoneRules">
          </v-text-field>
          <v-card-actions>
            <v-btn type="submit" color="success mx-7 mb-1" >Add</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="mx-7 mb-1" @click="()=> (dialog = false)">close</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    valid: false,
    person: {
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      photo:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    },

    textRules: [],
    emailRules: [],
    phoneRules: []
  }),
  watch: {
    'person.firstName'() {
      this.textRules=[]
    },
    'person.lastName'() {
      this.textRules=[]
    },
    'person.email'() {
      this.emailRules=[]
    },
    'person.phone'() {
      this.phoneRules=[]
    }
  },
  methods: {
    ...mapActions({
      addContact: 'auth/addContact'
    }),

    submit() {
      this.textRules = [
        value => !!value || 'Required.',
        value => (value && value.length >= 1) || 'Min 1 characters',
      ],
      this.emailRules = [
        value => !!value || 'Required.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      ],
      this.phoneRules = [
        value => !!value || 'Required.',
        value => (value && value.length >= 7) || 'Min 7 characters',
      ],
      setTimeout(() => {
        if (this.$refs.form.validate()){
          this.addContact(this.person)
          setTimeout(()=>{
            this.person.firstName=''
            this.person.lastName=''
            this.person.email=''
            this.person.phone=''
          })
        }
      })
      
    },
  }
}
</script>

<style>

</style>