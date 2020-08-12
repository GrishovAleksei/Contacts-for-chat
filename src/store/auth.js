import axios from "axios";

export default{
  namespaced: true,

  state: {
    token: null,
    user: null,
    contacts: null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user
    },
    contacts(state) {
      return state.contacts
    },
    getContactById: (state) => (id) => {
      return state.contacts.find(e => e.id === id)
    },
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts
    },
  },

  actions: {
    async signIn ({ commit, dispatch }, credentials) {
      let response = await axios.post('/login', credentials)
      
      commit('SET_TOKEN', response.data.accessToken)
      
      let responseUser = await axios.get('/users', {
        headers: {
          'Authorization': 'Bearer ' + response.data.accessToken
        }
      })
      commit('SET_USER', responseUser.data[0])

      return dispatch('attempt', response.data.accessToken )
      
    },

    async attempt({ commit }, token) {
      try {
        
        let response = await axios.get('/contacts', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        
        commit('SET_CONTACTS', response.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    signOut({ commit }) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_CONTACTS', null)
    },

    async addContact({ state, dispatch }, info) {
      await axios.post('/contacts', info, {
        headers: {
          'Authorization': 'Bearer ' + state.token
        }
      })
      dispatch('attempt', state.token ) 
    },

    async saveChanges({ state, dispatch }, request ) {
      await axios.patch('/contacts/'+request.id, request, {
        headers: {
          'Authorization': 'Bearer ' + state.token
        }
      })
      dispatch('attempt', state.token ) 
    },

    async deleteContact({ state, dispatch }, request ) {
      await axios.delete('/contacts/'+request.id,  {
        headers: {
          'Authorization': 'Bearer ' + state.token
        }
      }, request)
      
      dispatch('attempt', state.token ) 
    },

  }
}
  