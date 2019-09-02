<template lang="pug">
    .hamburger
        .line.label-background-color(v-for="line in lines" :key="line.id", :style="{top: line.top}") 
    </template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class Hamburger extends Vue {
  private size = 15;
  private get lines() {
    const ls = [];
    for (let i = 0; i < 3; i++) {
      ls.push({ id: i, top: this.size + 2 * i * this.size + "%" });
    }
    return ls;
  }
}
</script>

<style scoped>
.hamburger {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.line {
  position: absolute;
  width: 100%;
  height: 15%;
}
</style>
