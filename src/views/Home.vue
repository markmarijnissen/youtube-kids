<template>
    <div class="home">
      <YouTubeGrid v-for="playlistId in playlistIds"
        :playlist-id="playlistId"
        v-bind:key="playlistId"
      />
      <div class="settings-footer">
        <a class="settings" @click.prevent="gotoSettings">
          add/remove playlists
          </a>
      </div>
    </div>
</template>
<script>
import YouTubeGrid from "../components/YouTubeGrid.vue";
import state from "../model/state";

export default {
  name: "Home",
  components: { YouTubeGrid },
  props: {
    playlistIds: Array
  },
  methods: {
    gotoSettings() {
      state.playlistIds = [];
      state.playlistId = null;
      state.videoIds = [];
      state.videoId = null;
    }
  }
};
</script>
<style scoped>
.settings-footer {
  padding: 15px;
  float: right;
}
.settings {
  color: #888;
}
.settings-icon {
  font-size: 14px;
  line-height: 14px;
}
.settings:hover,
.settings:active,
.settings:focus {
  color: white;
}
</style>
