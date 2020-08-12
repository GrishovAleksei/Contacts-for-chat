<template>
  <v-row class="details">
    <v-col>
      <div v-show="this.show">
        <v-card>
          <v-img
            :src="person.photo"
            height="300px"
          >
            <v-layout
              column
              fill-height
            >
              <v-card-title>
                <v-btn dark icon @click="returnBack">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
  
                <v-spacer></v-spacer>
               

                <v-btn dark icon @click="saveContact" 
                  :outlined="indicator" v-show="indicator"
                  color="green">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>

                <v-btn dark icon @click="deleteC" 
                  :outlined="indicator" v-show="indicator"
                  color="red">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>

                <v-btn dark icon @click="edit" :outlined="indicator">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
  
                <v-btn dark icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-card-title>
  
              <v-spacer></v-spacer>
  
              <v-card-title class=" pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">
                  <input 
                  value="person.firstName"
                  :readonly="mode"
                  v-model="person.firstName"
                  required
                />
                <input
                  value="person.lastName"
                  :readonly="mode"
                  v-model="person.lastName"
                  required
                />  
                </div>
              </v-card-title>
            </v-layout>
          </v-img>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-text-field
                type="number" 
                :value="person.phone"
                :readonly="mode"
                v-model="person.phone">
              </v-text-field>
              
              <v-list-item-action>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-action>
            </v-list-item>


            <v-list-item >
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-text-field 
                
                :readonly="mode"
                v-model="person.email">
                {{person.email}}
              </v-text-field>
              
             
            </v-list-item>

          </v-list>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    mode: true,
    indicator: false,
  }),
  props: ["show", "person"],
  methods: {
    returnBack() {
      this.$emit('returnBack')
    },
    edit() {
      this.mode = !this.mode 
      this.indicator = !this.indicator
    },
    ...mapActions({
      saveChanges: 'auth/saveChanges',
      deleteContact: 'auth/deleteContact'
    }),
    saveContact() {
      let request = this.getContact(this.person.id)
      this.saveChanges(request)
      this.edit()
      this.$emit('returnBack')
    },
    deleteC() {
      let request = this.getContact(this.person.id)
      this.deleteContact(request)
      this.edit()
      this.$emit('returnBack')
    }
  },
  computed: {
    ...mapGetters({
      getContact: 'auth/getContactById',
    })
  },
}

</script>

<style>
 
  .details{
    margin-right: 0px;
    margin-left: 0px;
  }
  input{
    color: white;
  }
</style>