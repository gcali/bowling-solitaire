<template lang="pug">
    .hamburger-content
        .line.label-background-color(v-for="line in lines" :key="line.id", :style="{top: line.top, height: size + '%'}") 
    </template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Hamburger extends Vue {
  private readonly size = 15;

  private get lines() {
    const ls = [];
    for (let i = 0; i < 3; i++) {
      ls.push({ id: i, top: 8 + 2 * i * this.size + '%' });
    }
    return ls;
  }
}
</script>

<style scoped>
.hamburger-content {
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
