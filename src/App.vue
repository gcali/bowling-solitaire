<template lang="pug">
  #app
    router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class App extends Vue {}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

body {
  background-color: green;
}
</style>
