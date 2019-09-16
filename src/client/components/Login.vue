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
import { UserService, UserLogInError, UserSignUpError } from '@client/service/user';
import { UserValidationService } from '@client/service/validation';
import Loader from './Loader.vue';

@Component({ components: { Modal, Loader } })
export default class Login extends Vue {
  @Prop({ default: true })
  public shouldShow!: boolean;

  private showLoader: boolean = false;

  private readonly userService = new UserService();
  private readonly userValidationService = new UserValidationService();

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
        return this.handleErrors(errors, this.userValidationService.mapLogInErrors);
      });
    }
  }

  public async signUp() {
    if (this.validateAndSetLogInClientError(this.userData)) {
      await this.withLoader(
        async () => {
          const errors = await this.userService.signUp(this.userData);
          return this.handleErrors(errors, this.userValidationService.mapSignUpErrors);
        });
    }
  }

  private handleErrors<T>(errors: T[], mapper: ((es: T[]) => string[])): boolean {
    if (errors.length > 0) {
      this.errors = mapper(errors);
      return false;
    }
    return true;
  }


  private validateAndSetLogInClientError(userData: UserData): boolean {
    const errors = this.userValidationService.validate(this.userData);
    return this.handleErrors(errors, this.userValidationService.mapUserValidationErrors);
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

