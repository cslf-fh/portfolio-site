<template>
  <v-card
    class="d-flex justify-space-around"
    flat
    color="transparent"
    width="50%"
  >
    <v-btn
      v-for="i in shares"
      :key="i.name"
      fab
      text
      icon
      :href="i.link"
      target="_blank"
    >
      <v-icon v-if="i.mdi" :size="size">{{ i.icon }}</v-icon>
      <v-img
        v-else
        :src="i.icon"
        :lazy-src="i.icon"
        contain
        :height="size"
        :width="size"
      ></v-img>
    </v-btn>
  </v-card>
</template>

<script>
import iconQiita from '../assets/qiita.png';

export default {
  name: 'Shares',
  props: {
    size: [String, Number],
  },
  data() {
    return {
      shares: [
        {
          name: 'twitter',
          icon: 'mdi-twitter',
          link: 'https://twitter.com/cslf_fh',
          mdi: true,
        },
        {
          name: 'github',
          icon: 'mdi-github',
          link: 'https://github.com/cslf-fh',
          mdi: true,
        },
        {
          name: 'qiita',
          icon: iconQiita,
          link: 'https://qiita.com/cslf-fh',
          mdi: false,
        },
      ],
    };
  },
};
</script>
