<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-form
      ref="form"
      :class="['contact-form', { 'form-width': $vuetify.breakpoint.smAndUp }]"
      lazy-validation
      @submit.prevent="submit"
    >
      <validation-provider
        v-slot="{ errors }"
        name="お名前"
        rules="required|max:10"
      >
        <v-text-field
          v-model="contactForm.name"
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
          v-model="contactForm.email"
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
          v-model="contactForm.title"
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
          v-model="contactForm.content"
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
        :loading="contactForm.loading"
        width="150"
        large
        light
        color="orange"
      >
        送信
      </v-btn>
    </v-form>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="5000"
      bottom
      light
      multi-line
      vertical
      style="white-space: pre-line"
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </validation-observer>
</template>

<script>
import { functions } from '../plugins/firebase';

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

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    contactForm: {
      name: null,
      email: null,
      title: null,
      content: null,
      loading: false,
    },
    snackbar: {
      show: false,
      color: '',
      message: '',
    },
    ResizeObserverHeight: '',
  }),
  mounted() {
    this.animationContactform();
    this.ResizeDocument('portfolio');
  },
  watch: {
    ResizeObserverHeight() {
      this.animationContactform();
    },
  },
  methods: {
    submit() {
      if (this.$refs.observer.validate()) {
        this.contactForm.loading = true;
        const mailer = functions.httpsCallable('sendMail');

        mailer(this.contactForm)
          .then(() => {
            this.showSnackbar(
              'success',
              'お問い合わせありがとうございます。送信完了しました。'
            );
          })
          .catch((error) => {
            this.showSnackbar(
              'error',
              '送信に失敗しました。\n恐れ入りますが、時間をおいて再度お試しください。'
            );
            console.log(error);
          })
          .finally(() => {
            this.contactForm.loading = false;
            this.$refs.form.reset();
          });
      }
    },
    showSnackbar(color, message) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    //コンタクトフォームのアニメーション
    animationContactform() {
      const target = '.contact-form';
      gsap.fromTo(
        target,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'circ.inOut',
          scrollTrigger: {
            trigger: target,
            start: 'top 40%',
            //markers: true,
          },
          overwrite: true,
        }
      );
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

form[class*='inview'] {
  visibility: hidden;
}

.animated {
  visibility: visible !important;
}
</style>
