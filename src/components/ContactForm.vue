<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form
      :class="{ 'form-width': $vuetify.breakpoint.smAndUp }"
      @submit.prevent="submit"
    >
      <validation-provider
        v-slot="{ errors }"
        name="お名前"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="お名前"
          required
          outlined
          clearable
          :background-color="
            $vuetify.theme.dark ? 'hsla(0,0%,100%,.08)' : 'rgba(0,0,0,.06)'
          "
          color="orange"
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="メールアドレス"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="メールアドレス"
          required
          outlined
          clearable
          :background-color="
            $vuetify.theme.dark ? 'hsla(0,0%,100%,.08)' : 'rgba(0,0,0,.06)'
          "
          color="orange"
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="件名" rules="required">
        <v-text-field
          v-model="title"
          :error-messages="errors"
          label="件名"
          required
          outlined
          clearable
          :background-color="
            $vuetify.theme.dark ? 'hsla(0,0%,100%,.08)' : 'rgba(0,0,0,.06)'
          "
          color="orange"
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="お問い合わせ内容"
        rules="max:250"
      >
        <v-textarea
          v-model="message"
          :error-messages="errors"
          label="お問い合わせ内容"
          :counter="250"
          outlined
          clearable
          auto-grow
          :background-color="
            $vuetify.theme.dark ? 'hsla(0,0%,100%,.08)' : 'rgba(0,0,0,.06)'
          "
          color="orange"
        ></v-textarea>
      </validation-provider>

      <v-btn
        class="text-subtitle-1"
        type="submit"
        :disabled="invalid"
        width="150"
        large
        light
        color="orange"
      >
        送信
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  localize,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';

setInteractionMode('eager');
localize('ja', ja);

extend('required', required);
extend('max', max);
extend('email', {
  ...email,
  message: '有効なメールアドレスではありません',
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: null,
    email: null,
    title: null,
    message: null,
  }),
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-width {
  padding: 0 10ch;
  max-width: 780px;
  margin: auto;
}
</style>
