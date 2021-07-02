# vue-social-media-stories

A Vue component for stories

<br>

<img width="100%" src="./public/demo.gif" alt="Demo"/>

## Install

```bash
npm install vue-social-media-stories
```

## Demo

The component responds to actions like tap on the story to pause / play, click on the progress bars to navigate to different stories with custom time duration for each story.

## Usage

```jsx
<script>
import Vue from 'vue';
import VueSocialMediaStories from '@/vue-social-media-stories.vue';
import HeaderTestComponent from '@/header-test-component';
import SeemoreTestComponent from '@/seemore-test-component';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueSocialMediaStories,
    HeaderTestComponent,
    SeemoreTestComponent,
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
```

## Props

| Property             | Type     | Default         | Description
| -------------------- | --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stories`            | Object   | `required`      | An array of image or video urls or of story objects (options described below)
| `width`              | Number   | 360             | Width of the component in pixels
| `height`             | Number   | 640             | Height of the component in pixels
| `loop`               | Boolean  | false           | Loops back to the first story.
| `isPaused`           | Boolean  | false           | On click pause/play's the story
| `fullscreenMode`     | Boolean  | false           | Toggle fullscreen mode

### Story object

| Property             | Type     | Default         | Description
| -------------------- | --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`       |String    |none   | Optional. Url can be either image or video.
| `type`      |String    |none   | Optional. required with url can be either image or video. eg: `type: 'video'.
| `duration`  |Number    |2000   | Optional. Duration of the story.
| `header`    |Component |none   | Optional. Adds a component to the story.
| `seemore`   |Component |none   | Optional. Adds a see more section at the bottom of the story. On clicking, opens up this component.
| `styles`    |Object    |default Style   | Optional. Override the default story styles mentioned below.

### Default story styles

Following are the default story content styles.

```js
//default style if the story has url type image or no url
styles: {
  width:this.width+'px',
	height:this.height+'px',
	backgroundSize:"cover",
	backgroundRepeat:"no-repeat",
	backgroundColor:"black",
	backgroundPosition:"center",
	backgroundImage:"",
	color:"white",
}
```
```js
//default style if the story has url type video
styles: {
  width:"100%",
  height:"96%",
  objectFit:"cover",
}
```

## Development

To develop this package locally, you can follow these steps:

1. Clone the repository to your local.
2. Then `cd Vue-Social-Media-Stories && npm install`
3. Run `npm run serve`

## Inspired By

https://github.com/mohitk05/react-insta-stories

## Contributors

Tashif Muzaffar </br>
https://github.com/tashif900
