<template lang="pug">
    Modal(:shouldShow="shouldShow", @close="handleClose()") 
        .modal-content(@keyup.enter="logIn()")
            .input-row
                .label User
                input.input(v-model="userData.userName", ref="focus-input")
            .input-row
                .label Password
                input(type="password").input(v-model="userData.password")
            .actions
                button.dark-background-color.label-color(@click="signUp()") Sign up
                button.table-background-color.label-color(@click="logIn()") Log in
            .validation(v-if="errors.length > 0")
              .validation-message(v-for="error in errors") {{error}}
            Loader.loader(:shouldShow="showLoader")
</template>

<script lang="ts">

interface UserData {
  userName: string;
  password: string;
}

import Modal from './Modal.vue';
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { UserService, UserLogInError, UserValidationError, UserSignUpError } from '@client/service/user';
import Loader from './Loader.vue';

@Component({ components: { Modal, Loader } })
export default class Login extends Vue {
  @Prop({ default: true })
  public shouldShow!: boolean;

  private showLoader: boolean = false;

  private userService = new UserService();

  private errors: string[] = [];

  private userData: UserData = {
    userName: '',
    password: '',
  };

  @Watch('shouldShow')
  public onShownChanged() {
    this.userData = {
      userName: '',
      password: '',
    };
    this.errors = [];
    if (this.shouldShow) {
      setTimeout(() =>
        (this.$refs['focus-input'] as any).focus(),
        0,
      );
    }
  }

  public async logIn() {
    if (this.validateAndSetLogInClientError(this.userData)) {
      await this.withLoader(async () => {
        const errors = await this.userService.logIn(this.userData);
        if (errors.length > 0) {
          this.errors = this.mapLogInErrors(errors);
          return false;
        }
        return true;
      });
    }
  }

  public async signUp() {
    if (this.validateAndSetLogInClientError(this.userData)) {
      await this.withLoader(
        async () => {
          const errors = await this.userService.signUp(this.userData);
          if (errors.length > 0) {
            this.errors = this.mapSignUpErrors(errors);
            return false;
          }
          return true;
        });
    }
  }

  private mapSignUpErrors(errors: UserSignUpError[]): string[] {
    return errors.map((e) => {
      switch (e) {
        case 'USER_EXISTING': return 'User already exists';
      }
    });
  }

  private mapLogInErrors(errors: UserLogInError[]): string[] {
    return errors.map((e) => {
      switch (e) {
        case 'USER_NOT_FOUND': return 'User was not found';
        case 'WRONG_PASSWORD': return 'Wrong password';
      }
    });
  }

  private mapUserValidationErrors(errors: UserValidationError[]): string {
    const missingFields = errors.map((e) => {
      switch (e) {
        case 'NO_USER': return 'user';
        case 'NO_PASSWORD': return 'password';
      }
    });
    let error = missingFields.join(' and ');
    if (error) {
      error = error[0].toUpperCase() + error.slice(1);
    }
    return error;
  }

  private validateAndSetLogInClientError(userData: UserData): boolean {
    const errors = this.userService.validate(this.userData);
    if (errors.length > 0) {
      const error = this.mapUserValidationErrors(errors);
      this.errors = [`${error} required`];
      return false;
    }
    return true;
  }

  private handleClose() {
    if (!this.showLoader) {
      this.$emit('close');
    }
  }

  private async withLoader(callback: (() => Promise<boolean>)) {
    if (!this.showLoader) {
      this.showLoader = true;
      let result = false;
      try {
        result = await callback();
      } finally {
        this.showLoader = false;
      }
      if (result) {
        this.handleClose();
      }
    }
  }

}
</script>

<style scoped>
.modal-content {
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

.validation {
  color: red;
  font-weight: bold;
}
</style>

