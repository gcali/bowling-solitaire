<template lang="pug">
.status-visualizer(:style="mainStyle")
    .label.label-color(:style="styleFirst") {{label}}
    .value.value-color {{value}}
    .label.label-color(:style="styleSecond") {{label}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class StatusVisualizer extends Vue {
  @Prop({ required: true })
  public label!: string;
  @Prop({ required: false, default: '' })
  public value!: string;
  @Prop({ required: false, default: false })
  public invertPosition!: boolean;
  @Prop({ required: false, default: false })
  public fixWidth!: boolean;

  public get mainStyle() {
    return this.fixWidth
      ? {
        width: '6em',
      }
      : {};
  }

  public get styleFirst() {
    return {
      display: this.invertPosition ? 'none' : 'block',
      paddingRight: !this.invertPosition && !this.fixWidth ? '0.5em' : '0em',
    };
  }
  public get styleSecond() {
    return {
      display: this.invertPosition ? 'block' : 'none',
      paddingLeft: this.invertPosition && !this.fixWidth ? '0.5em' : '0em',
    };
  }
}
</script>

<style scoped>
.status-visualizer {
  display: flex;
  flex-direction: row;
  background-color: #025002;
  justify-content: space-between;
  padding: 0.5em 1em;
}

.label {
  text-transform: uppercase;
  /* color: yellowgreen; */
}
/* :not(.with-background).value {
  color: yellow;
} */

/* .value {
  line-height: 20px;
} */

/* .with-background {
  background-color: white;
  border-radius: 0.3em;
  margin-right: 0.5em;
  margin: 0.2em 0.4em;
} */
</style>
