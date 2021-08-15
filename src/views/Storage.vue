<template>
  <div>
    <div v-for="i in apis" :key="i.id" style="white-space: pre-line">
      <p>{{ i.id }}</p>
      <p>{{ i.title }}</p>
      <p>{{ i.description }}</p>
      <p>{{ i.language }}</p>
      <p>{{ i.image }}</p>
      <p>{{ i.link }}</p>
      <p>{{ i.dialog }}</p>
    </div>
    <div v-for="i in storage" :key="i.title" style="white-space: pre-line">
      <p>{{ i.id }}</p>
      <p>{{ i.title }}</p>
      <p>{{ i.description }}</p>
      <p>{{ i.language }}</p>
      <p>{{ i.image }}</p>
      <p>{{ i.link }}</p>
      <p>{{ i.dialog }}</p>
    </div>
  </div>
</template>

<script>
import { storage } from '../plugins/storage';

export default {
  name: 'Storage',
  data: () => ({
    apis: [],
    storage: [],
  }),
  created() {
    this.getPublic();
    this.getStorage();
  },
  methods: {
    getPublic() {
      this.$axios.get('./assets/api.json').then((response) => {
        this.apis = response.data.portfolio;
      });
    },
    getStorage() {
      const json = storage.ref('assets/api.json');
      json
        .getDownloadURL()
        .then((url) => {
          return this.$axios.get(url);
        })
        .then((response) => {
          const data = response.data;
          this.storage = data.portfolio;
        });
    },
  },
};
</script>
