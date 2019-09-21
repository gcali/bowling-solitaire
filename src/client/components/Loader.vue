<template lang="pug">
    .loader.loader-external(:style="style")
        .loader.loader-3
        .loader.loader-3
        .loader.loader-3
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Loader extends Vue {
  @Prop({ default: true })
  public shouldShow!: boolean;

  public get style() {
    return {
      visibility: this.shouldShow ? 'visible' : 'hidden',
    };
  }
}
</script>

<style scoped>
.loader {
  display: flex;
  height: 30px;
  width: 30px;
  align-items: center;
  justify-content: space-around;
}
.loader-3 {
  background: white;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  animation: loader-external 1s cubic-bezier(0.41, 0.25, 0.32, 0.83) infinite;
}
.loader-3:nth-of-type(2) {
  animation: loader-external 1s cubic-bezier(0.41, 0.25, 0.32, 0.83) 0.25s
    infinite;
}
.loader-3:nth-of-type(3) {
  animation: loader-external 1s cubic-bezier(0.41, 0.25, 0.32, 0.83) 0.5s
    infinite;
}
@keyframes loader-external {
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}
</style>

