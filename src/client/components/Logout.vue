<template lang="pug">
    Modal(:shouldShow="shouldShow", @close="handleClose()") 
        .modal-content
          .question Are you sure you want to log out?
          .actions
              button.dark-background-color.label-color(@click="handleClose()") Cancel
              button.table-background-color.label-color(@click="logOut()") Log out
          Loader.loader(v-if="showLoader")
</template>

<script lang="ts">

interface UserData {
    userName: string;
    password: string;
}

import Modal from './Modal.vue';
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { UserService } from '@client/service/user';
import Loader from './Loader.vue';

@Component({ components: { Modal, Loader } })
export default class Logout extends Vue {
    @Prop({ default: true })
    public shouldShow!: boolean;

    private showLoader: boolean = false;

    private userService = new UserService();

    private async logOut() {
        await this.withLoader(() => this.userService.logOut());
        this.handleClose();
    }

    private async withLoader(callback: (() => Promise<void>)) {
        if (!this.showLoader) {
            this.showLoader = true;
            try {
                await callback();
            } finally {
                this.showLoader = false;
            }
        }
    }

    private handleClose() {
        if (!this.showLoader) {
            this.$emit('close');
        }
    }

}
</script>

<style scoped>
.modal-content {
    padding-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.input-row {
    padding: 0.5em 1em;
}
.label {
    text-transform: uppercase;
}
.actions {
    margin: 0.5em 1em;
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
button {
    margin: 0em 1em;
}
.input-row input {
    padding: 0.1em 0.3em;
}
.loader {
    margin: 0 auto;
}
</style>

