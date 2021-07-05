<script>
import Vue from 'vue';
import VueSocialMediaStories from '@/vue-social-media-stories.vue';
import HeaderTestComponent from '@/header-test-component';
import SeemoreTestComponent from '@/seemore-test-component';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueSocialMediaStories,
    HeaderTestComponent,// eslint-disable-line
    SeemoreTestComponent,// eslint-disable-line
  },
  data(){
    return{
      stories:[
        {
          duration:4000,
          header:HeaderTestComponent,
          seemore:SeemoreTestComponent,
          styles:{
            backgroundColor:"#ff756b",
          }
        },
        {
          url:'http://localhost:8080/scene01.jpg',
          duration:5000,
          type:'image',
        },
        {
          url:'http://localhost:8080/demo01.mp4',
          duration:9000,
          type:'video',
          seemore:SeemoreTestComponent,
        },
        {
          url:'http://localhost:8080/scenery.png',
          duration:4000,
          type:'image',
          styles:{
            backgroundSize:'contain',
          }
        },
        {
          url:'http://localhost:8080/nature01.mp4',
          duration:20000,
          type:'video',
          seemore:SeemoreTestComponent,
          styles:{
            objectFit:'contain',
          }
        },
      ]
    }
  },
  methods:{
    CheckFullScreen(value){
      console.log(value);
    },
    CheckSeemore(value){
      console.log(value);
    },
    LastFrame(value){
      console.log(value);
    },
  }
});
</script>

<template>
  <div id="app">
    <vue-social-media-stories
      :width="350" 
      :height="600" 
      :stories="stories" 
      :loop=true 
      :isPause=true 
      :fullscreenMode=true
      v-on:fullscreen="CheckFullScreen($event)" 
      v-on:seemore="CheckSeemore($event)"
      v-on:lastframe="LastFrame($event)"  
    />
  </div>
</template>

<style>
body{
  background-image: url("http://localhost/img/DL26Rv.webp");
  background-size: cover;
}
h1{
  font-family: Arial, Helvetica, sans-serif;
}
</style>
