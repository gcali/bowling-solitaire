<template lang="pug">
.modal-wrapper(@click.self="emitClose()", :style="style")
    .content.dark-background-color.label-color(@click.prevent="handleClick()") 
        slot
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
@Component({ components: {} })
export default class Modal extends Vue {

  public get style() {
    return {
      display: this.shouldShow ? 'flex' : 'none',
    };
  }
  @Prop({ default: true })
  public shouldShow!: boolean;

  private canClose = true;

  public handleClick(e: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
  }

  @Emit('close')
  // tslint:disable-next-line:no-empty
  public emitClose() { }

}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(1, 1, 1, 0.3);
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.content {
  max-width: 19em;
  max-height: 30em;
  box-shadow: 1px 1px 1px 1px black;
  padding: 1em;
}
</style>
