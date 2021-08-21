<template>
  <v-row no-gutters>
    <v-col
      v-inview:animate="'fadeInRight'"
      v-for="i in portfolio"
      :key="i.id"
      class="pa-4"
      cols="12"
      sm="4"
    >
      <v-hover v-slot="{ hover }">
        <v-card :elevation="hover ? 12 : 4">
          <v-img
            class="align-center"
            :src="i.image"
            :lazy-src="i.image"
            height="200"
            gradient="to top right, rgba(255,255,255,.33), rgba(255,255,255,.7)"
          >
            <v-card-text class="text-h5 black--text" v-text="i.title">
            </v-card-text>
            <v-expand-transition>
              <div
                v-if="hover"
                class="
                  d-flex
                  align-center
                  justify-center
                  transition-fast-in-fast-out
                  orange
                  v-card--reveal
                "
              >
                <v-btn
                  dark
                  color="black"
                  tile
                  v-text="'more'"
                  @click.stop="i.dialog = true"
                ></v-btn>
              </div>
            </v-expand-transition>
            <v-dialog
              v-model="i.dialog"
              eager
              overlay-opacity="0.7"
              :retain-focus="false"
              :max-width="$vuetify.breakpoint.mdAndUp ? '50%' : '75%'"
            >
              <v-card flat color="background">
                <v-img
                  class="align-end"
                  :src="i.image"
                  :lazy-src="i.image"
                  max-height="300px"
                >
                  <v-card-title
                    class="text-h5 white--text text-shadow"
                    v-text="i.title"
                  ></v-card-title>
                </v-img>
                <v-card-text
                  class="text--primary text-subtitle-1 py-4 white-space"
                  v-text="i.description"
                ></v-card-text>
                <v-divider></v-divider>
                <v-card-text
                  class="text-subtitle-1 py-4"
                  v-text="i.language"
                ></v-card-text>
                <v-card-actions>
                  <v-btn
                    outlined
                    tile
                    v-text="'view'"
                    :href="i.link"
                    target="_blank"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    outlined
                    tile
                    v-text="'close'"
                    @click="i.dialog = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-img>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { storage } from '../plugins/storage';
import api from '../assets/api.json';

export default {
  name: 'Portfolio',
  data() {
    return {
      portfolio: [],
    };
  },
  created() {
    if (process.env.VUE_APP_MODE === 'production') {
      this.getStorage();
    } else {
      const portfolio = api.portfolio;
      this.portfolio = portfolio.map((object) => {
        return object;
      });
      this.portfolio.reverse();
    }
  },
  methods: {
    getStorage() {
      this.portfolio = [];
      const json = storage.ref('assets/api.json');
      json
        .getDownloadURL()
        .then((url) => {
          return this.$axios.get(url);
        })
        .then((response) => {
          const data = response.data.portfolio;
          const sort = 'id';
          data.sort((a, b) => {
            if (a[sort] > b[sort]) {
              return 1;
            } else {
              return -1;
            }
          });
          this.portfolio = data.reverse();
        });
    },
  },
};
</script>

<style language="scss" scoped>
.v-card--reveal {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.text-shadow {
  text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000,
    1px -1px 0px #000, 1px 0px 0px #000, -1px 0px 0px #000, 0px 1px 0px #000,
    0px -1px 0px #000;
}

.white-space {
  white-space: pre-line;
  word-break: break-word;
}

div[class*='inview'] {
  opacity: 0;
}
</style>
