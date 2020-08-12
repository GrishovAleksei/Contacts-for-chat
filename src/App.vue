<template >
  <v-app >
    <div class="bg">
      <NavBar />
    <v-main>
      <v-container >
        <router-view/>
      </v-container>
    </v-main>
    </div>
    
 
  </v-app>  
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">

.bg {
  width: 100%;
  height: 100%;
  background-color: teal;
}
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 72px)
  }
  .avatar {
    /* display: flex; */
    height: 50px;
    max-width: 50px;
    margin-left: 23px;
    border-radius: 5px;
  }

</style>