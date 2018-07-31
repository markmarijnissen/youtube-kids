<template>
<div class="welcome-content mui-panel">
    <!-- <form class="mui-form--inline">
      <div class="mui-textfield">
        <input type="text" v-model="q">
      </div>
      <button @click.prevent="search" class="mui-btn"><i class="material-icons">search</i></button>
    </form>
    <div v-for="result in searchResults">
      {{ result.title }}
    </div> -->
    <div class="mui-textfield">
        <label>YouTube Playlist URL</label>
        <input type="text" v-model="url" placeholder="Copy & paste a YouTube Playlist URL">
    </div>
    <button class="mui-btn mui-btn--raised mui-btn--danger" :disabled="!valid" @click.prevent="save">Save</button>
</div>
</template>
<script>
import urlParser from "js-video-url-parser/lib/base";
import "js-video-url-parser/lib/provider/youtube";
import api from "../model/api";

export default {
  name: "Settings",
  data() {
    return {
      url: localStorage.url || "",
      q: "",
      searchResults: []
    };
  },
  computed: {
    playlistId() {
      const result = urlParser.parse(this.url);
      if (result && result.list) return result.list;
      return false;
    },
    valid() {
      return !!this.playlistId;
    }
  },
  methods: {
    save() {
      if (this.valid) {
        localStorage.url = this.url;
        this.$emit("update:playlist-id", this.playlistId);
      }
    },
    search() {
      console.log("search", this.q);
      api.searchPlaylist(this.q).then(results => {
        this.searchResults = results;
      });
    }
  }
};
</script>
<style>
.welcome-content {
  margin-bottom: 0;
}
</style>
