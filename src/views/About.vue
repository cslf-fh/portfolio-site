<template>
  <div>
    <div v-for="i in firebase" :key="i.name">
      <p>{{ i.name }}</p>
      <p>{{ i.age }}</p>
    </div>
    <div v-for="i in axios" :key="i.name">
      <p>{{ i.fields.name.stringValue }}</p>
      <p>{{ i.fields.age.integerValue }}</p>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase';

const URL =
  'https://firestore.googleapis.com/v1/projects/cslf-fh/databases/(default)/documents/';

export default {
  data: () => ({
    firebase: [],
    axios: [],
  }),
  firestore() {
    return {
      firebase: db.collection('test'),
    };
  },
  created() {
    this.getApis();
  },
  methods: {
    getApis() {
      this.$axios.get(URL + 'test').then((response) => {
        this.axios = response.data.documents;
      });
    },
  },
};
</script>
