<template>
  <v-container>
    <div v-if="authenticated">
      
      <!-- ADD BLOCK HERE!!!! -->
      <v-row class="background: success">
        <v-flex xs12 sm5 md4 lg3 xl2>
          <v-row class="mr-3" align="center">
            <v-avatar class="mx-7 my-2" size="45">
              <v-img  :src="user.photo"/>
            </v-avatar>
            {{ user.firstName }} 
            {{ user.lastName }}
          </v-row>
        </v-flex>
      </v-row>
      <v-row class="background: white">
        <v-flex xs12 sm5 md4 lg3 xl2>
          <v-text-field
              outlined
              rounded
              label="Type to search"
              prepend-inner-icon="mdi-magnify"
              v-model="strFilter"
              class="ma-3"
          ></v-text-field>
          <v-form >
            <v-list v-for="contact of filterContacts" :key="contact.id">
              <v-list-item  @click="() => open(contact)">
                <v-avatar class="mr-5 my-2">
                  <v-img :src="contact.photo"/>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{contact.firstName}} 
                    {{contact.lastName}}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-divider inset></v-divider>
            </v-list>
          </v-form>
          <v-flex>
            <Add/>
          </v-flex>
        </v-flex>
        <v-flex class="chat" xs12 sm7 md8 lg9 xl10>
          <Details :show="show" 
            :person="person" 
            @returnBack="open('')
          "/>
        </v-flex>
      </v-row>
    </div>
    <div v-else>
      <h1 align="center" class="white--text">You should be authorized</h1>
    </div>
    
    <div>
 
    </div>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'
import Add from '@/components/Add'
import Details from '@/components/Details'
export default {
  name: 'mainPage',

  data: () => ({
    show: false,
    person:'',
    strFilter: '',
  }),

  components: {
    Add, Details
  },

  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      contacts: 'auth/contacts',
      user: 'auth/user',
    }),
    filterContacts: function() {
      return this.contacts.filter((contact) => {
        for(let prop of ['firstName', 'lastName']) {
          if(contact[prop].toLowerCase().includes(this.strFilter.toLowerCase())) return true
        }
      })
    },
  },

  methods: {
    open(contact) {
      this.person = contact
      this.show =  !this.show
    },
  }
}

</script>

<style>
  .chat{
    
  background: url('https://i.pinimg.com/originals/07/b3/7d/07b37d9e8af59caf15b0f8e1b49da368.jpg')  no-repeat center center;
  background-size: cover;
  width: 100%;

  }
 
</style>