<template>
  <v-container>
    <v-text-field v-model="name" label="name"></v-text-field>
    <v-text-field v-model.number="age" label="age"></v-text-field>
    <v-btn @click="postData">post</v-btn>
    <v-row>
      <v-col cols="6">
        <p>get with vuefire</p>
        <div v-for="i in firebase" :key="i.name">
          <p>name : {{ i.name }}</p>
          <p>age : {{ i.age }}</p>
        </div>
      </v-col>
      <v-col cols="6">
        <p>get with axios</p>
        <div v-for="i in axios" :key="i.name">
          <p>name : {{ i.fields.name.stringValue }}</p>
          <p>age : {{ i.fields.age.integerValue }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../plugins/firebase';

//エンドポイント
const URL =
  'https://firestore.googleapis.com/v1/projects/cslf-fh/databases/(default)/documents/';

export default {
  data: () => ({
    firebase: [],
    axios: [],
    name: '',
    age: '',
    users: [],
  }),
  firestore() {
    return {
      firebase: db.collection('users').orderBy('userId'), //データの取得と並び替え
      users: db.doc('users/user'), //usersの延べ人数取得
    };
  },
  async created() {
    await this.getAxios();
  },
  methods: {
    getAxios() {
      this.$axios.get(URL + 'users').then((response) => {
        this.axios = response.data.documents;
        this.axios.splice(0, 1);
      });
    },
    postData() {
      let id = 0; //usersコレクションが無い場合のidの初期値
      this.users ? (id = this.users.totalNumber) : null;
      id++;
      //user情報書き込み
      db.collection('users')
        .doc(`user${id}`)
        .set({
          userId: id,
          name: this.name,
          age: this.age,
        })
        .then(() => {
          this.name = this.age = '';
        });
      //延べ人数更新
      db.collection('users').doc('user').set({ totalNumber: id });
    },
  },
};
</script>
