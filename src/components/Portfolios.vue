<template>
  <v-row no-gutters>
    <v-col v-for="i in portfolios" :key="i.id" class="pa-4" cols="12" sm="4">
      <v-hover v-slot="{ hover }">
        <v-card :elevation="hover ? 12 : 4">
          <v-img
            class="align-center"
            :src="i.img"
            :lazy-src="i.img"
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
                  :src="i.img"
                  :lazy-src="i.img"
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
export default {
  name: 'Portfolios',
  data() {
    return {
      portfolios: [
        {
          id: 1,
          img: 'https://picsum.photos/id/0/300',
          link: 'https://sample-6e139.web.app/',
          title: 'WordPress構築サイトを静的サイト化',
          description: `WordPressで構築したサイトを静的サイト化し、Firebaseでホスティングしたものです。
            基となったサイトはテーマから自作しています。`,
          language: 'HTML / CSS / PHP / WordPress / JapaScript(Vue.js)',
          dialog: false,
        },
        {
          id: 2,
          img: 'https://picsum.photos/id/1/300',
          link: '',
          title: 'b',
          description: 'description',
          language: '',
          dialog: false,
        },
        {
          id: 3,
          img: 'https://picsum.photos/id/2/300',
          link: '',
          title: 'c',
          description: 'description',
          language: '',
          dialog: false,
        },
        {
          id: 4,
          img: 'https://picsum.photos/id/3/300',
          link: '',
          title: 'd',
          description: 'description',
          language: '',
          dialog: false,
        },
        {
          id: 5,
          img: 'https://picsum.photos/id/4/300',
          link: '',
          title: 'e',
          description: 'description',
          language: '',
          dialog: false,
        },
      ],
    };
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
</style>
