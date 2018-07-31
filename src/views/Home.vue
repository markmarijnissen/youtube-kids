<template>
    <div class="home">
      <Grid v-for="playlistId in playlistIds"
        :playlist-id="playlistId"
        v-bind:key="playlistId"
      />
      <div class="settings-footer">
        <a class="settings" @click.prevent="gotoSettings">
          change playlist
          </a>
      </div>
    </div>
</template>
<script>
import Grid from "../components/Grid.vue";
import state from "../model/state";

export default {
  name: "Home",
  components: { Grid },
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
