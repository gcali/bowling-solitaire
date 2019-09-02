<template lang="pug">
nav.dark-background-color(:style="style", @click.prevent="handleClick")
    .close.label-color(@click="close()") X
    .info.label-color
        .info-data.item User
    .actions.label-color
        .action.item Save
        .action.item Load
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({ components: {} })
export default class LeftMenu extends Vue {
  @Prop()
  public shouldShow!: boolean;

  @Emit("close")
  close() {}

  handleClick(e: MouseEvent) {
    e.stopPropagation();
  }

  public get style() {
    if (this.shouldShow) {
      return {
        left: "0px"
      };
    } else {
      return {};
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 1em;
  padding-top: 4em;
  width: 10em;
  left: -10em;
  height: 100%;
  position: fixed;
  top: -1px;
  transition: left 0.5s ease-in-out;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.close {
  position: absolute;
  top: 3em;
  right: 1em;
  user-select: none;
  cursor: pointer;
}

.item {
  padding: 0.5em 1em;
  text-transform: uppercase;
  user-select: none;
}
</style>