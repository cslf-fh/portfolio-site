<template>
  <v-row class="centered" no-gutters>
    <v-col cols="12" sm="5" align-self="center">
      <v-avatar size="200">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
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
          class="white-space text--primary text-subtitle-1 px-0"
          v-text="texts.text"
        ></v-card-text>
        <v-divider></v-divider>
        <v-card-text
          class="white-space text-subtitle-1 px-0"
          v-text="texts.language"
        ></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      texts: {
        text: `aaaaaaaaa
      bbbbbbbb
      ccccccccccccccccccccccccccccc
      dddddddd`,
        language: `HTML / CSS(SCSS) / JavaScript / Vue.js(Vuetify) / PHP / MySQL / WordPress`,
      },
    };
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
</style>
