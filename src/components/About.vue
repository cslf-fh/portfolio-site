<template>
  <v-row class="centered" no-gutters>
    <v-col
      v-inview:animate="'fadeInRight'"
      cols="12"
      sm="5"
      align-self="center"
    >
      <v-avatar size="200">
        <v-img :src="about.image"></v-img>
      </v-avatar>
    </v-col>
    <v-col class="py-4 d-sm-none" cols="12"></v-col>
    <v-col cols="12" sm="7" align-self="center">
      <v-card
        :class="{ 'text-left': $vuetify.breakpoint.smAndUp }"
        flat
        color="transparent"
      >
        <v-card-text
          v-inview:animate="'fadeInRight'"
          class="white-space text--primary text-subtitle-1 px-0"
          v-text="about.text"
        ></v-card-text>
        <v-divider></v-divider>
        <v-card-text
          v-inview:animate="'fadeInRight'"
          class="white-space text-subtitle-1 px-0"
          v-text="about.language"
        ></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { storage } from '../plugins/storage';
import api from '../assets/api.json';

export default {
  data() {
    return {
      about: [],
    };
  },
  created() {
    if (process.env.VUE_APP_MODE === 'production') {
      this.getStorage();
    } else {
      this.about = api.about;
    }
  },
  methods: {
    getStorage() {
      this.portfolios = [];
      const json = storage.ref('assets/api.json');
      json
        .getDownloadURL()
        .then((url) => {
          return this.$axios.get(url);
        })
        .then((response) => {
          const data = response.data.about;
          this.about = data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.white-space {
  white-space: pre-line;
  word-break: break-word;
}

.centered {
  padding: 0 5ch;
}

div[class*='inview'] {
  opacity: 0;
}
</style>
