<template>
  <Layout class="app" 
  :show-player="showPlayer" 
  @swipe-home="onSwipeHome">
    <template slot="pages">
      <Settings 
        v-show="showSettings"
        @update:playlist-id="setPlaylistIds([$event])" 
      />
      <Home 
        v-show="!showSettings"
        :playlist-ids="state.playlistIds"
      />
    </template>
    <template slot="player">
      <Player :playlist-id="state.playlistId" />
    </template>
  </Layout>
</template>
<script>
import Layout from "./components/Layout.vue";
import Home from "./views/Home.vue";
import Player from "./views/Player.vue";
import Settings from "./views/Settings.vue";
import state from "./model/state";

export default {
  name: "App",
  components: { Layout, Player, Home, Settings },
  created() {
    this.setUrl();
  },
  data() {
    return {
      state
    };
  },
  computed: {
    showSettings() {
      return this.state.playlistIds.length === 0;
    },
    showPlayer() {
      return !!this.state.videoId && !!this.state.playlistId;
    },
    playlistIndex() {
      console.log(
        "playlistIndex",
        this.state.playlistIds.indexOf(this.state.playlistId)
      );
      return this.state.playlistIds.indexOf(this.state.playlistId);
    },
    videoIndex() {
      return this.state.videoIds.indexOf(this.state.videoId);
    },
    hash() {
      if (this.state.playlistIds.length === 0) {
        return "#/";
      }
      const base = `#/${this.state.playlistIds.join(",")}`;
      if (this.videoIndex >= 0 && this.playlistIndex >= 0) {
        return `${base}/${this.playlistIndex}/${this.videoIndex}`;
      }
      return base;
    }
  },
  methods: {
    setPlaylistIds(ids) {
      this.state.playlistIds = ids;
      localStorage.playlistIds = ids.join(",");
    },
    onSwipeHome() {
      this.state.playlistId = null;
      this.state.videoId = null;
    },
    setUrl() {
      location.hash = this.hash;
    }
  },
  watch: {
    hash: "setUrl"
  }
};
</script>
<style>
html,
body {
  margin: 0;
}
html {
  height: 100%;
  /* overflow: hidden; */
}
body {
  height: 100%;
  /* overflow: hidden; */
  background-color: #222;
  color: white;
}
</style>
