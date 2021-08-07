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
      <v-icon :size="size">{{ i.icon }}</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
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
        },
        {
          name: 'github',
          icon: 'mdi-github',
          link: 'https://github.com/cslf-fh',
        },
      ],
    };
  },
};
</script>
