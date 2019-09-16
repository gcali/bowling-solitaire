<template lang="pug">
  #app
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class App extends Vue { }
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* max-width: 60em;
  margin: 0 auto; */
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn {
  box-shadow: none;
  background-color: grey;
  border-radius: 2px;
  border: none;
  padding: 0.5em 1em;
}

button {
  user-select: none;
}

button:focus {
  outline: none;
  position: relative;
}

button:hover:after {
  position: absolute;
  width: 100%;
  height: 100%;
  content: "";
  background-color: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  /* outline: darkgreen inset; */
}

body {
  background-color: green;
  margin: 0;
}
.label {
  user-select: none;
}
.value {
  user-select: none;
}
.unselectable {
  user-select: none;
}
</style>
