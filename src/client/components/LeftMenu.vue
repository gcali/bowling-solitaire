<template lang="pug">
nav.dark-background-color(:style="style", @click.prevent="handleClick")
    .close.label-color(@click="close()") X
    .info.label-color(v-if="!isLoggedIn")
        .info-data.item(@click="login()") Log in
    .info.label-color(v-if="isLoggedIn")
        .info-data.item(style="text-transform: none") Hello {{store.state.userData.userName}}</span>!
    .actions.label-color
        .action.item Save
        .action.item Load
    .log-out.label-color(v-if="isLoggedIn", @click="logOut()") Log out
</template>

<script lang="ts">
import { UserService } from '@client/service/user';
import { store } from '@client/utils/store';
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
@Component({ components: {} })
export default class LeftMenu extends Vue {
  @Prop()
  public shouldShow!: boolean;

  private readonly userService = new UserService();

  private store = store;
  private get isLoggedIn() {
    return this.store.state.userData !== undefined && this.store.state.userData.userName.length > 0;
  }

  @Emit('close')
  public close() { }

  public handleClick(e: MouseEvent) {
    e.stopPropagation();
  }

  @Emit('close')
  @Emit('login')
  public login() { }

  @Emit('close')
  @Emit('logout')
  private logOut() { }

  public get style() {
    if (this.shouldShow) {
      return {
        left: '0px',
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

.info {
  text-align: left;
}

.log-out {
  flex-grow: 1;
  align-self: flex-end;
  text-align: end;
  display: flex;
  align-items: flex-end;
}
</style>