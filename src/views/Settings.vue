<template>
<div class="settings">
  <div class="title mui--text-title">
    <img src="../assets/logo.png" class="icon">
        YouTube for Kids
  </div>
  <div class="form" style="padding: 20px 20px 0">Play only YouTube videos from playlists you approve.</div>
    
  <transition-group name="delete">
    <PlaylistInfo 
      class="mui-panel list-item hide-description"
      v-for="(id,index) in ids" 
      v-bind:key="id"
      :playlist-id="id">
      <i class="close material-icons" @click="remove(index)">close</i>
    </PlaylistInfo>
  </transition-group>
  <div class="form" v-if="ids.length === 0">
    <div class="mui-panel" style="margin-top: 20px">
      <ol>
        <li>Open <a href="https://youtube.com" target="_blank">YouTube</a></li>
        <li>Find a playlist</li>
        <li>Copy the URL - use the share button</li>
      </ol>
    </div>
  </div>
  <div class="form content">
    <div class="mui-panel">
      <div class="mui-textfield">
          <input type="text" v-model="url" placeholder="Copy & paste Playlist URL / ID">
      </div>
    </div>
  </div>
  <div class="form">
        <button class="btn-save mui-btn mui-btn--raised mui-btn--danger" :disabled="!valid" @click.prevent="save">
          Start
        </button>
    <div style="clear: both"></div>
  </div>
</div>
</template>
<script>
// import urlParser from "js-video-url-parser/lib/base";
// import "js-video-url-parser/lib/provider/youtube";
import PlaylistInfo from "../components/PlaylistInfo.vue";
import api from "../model/api";
import state from "../model/state";
import uniq from "lodash.uniq";

export default {
  name: "Settings",
  components: { PlaylistInfo },
  data() {
    return {
      ids: state.playlistIds,
      url: "",
      q: "",
      searchResults: []
    };
  },
  created() {
    this.onUrlChanged();
  },
  computed: {
    valid() {
      return this.ids.length > 0;
    }
  },
  methods: {
    save() {
      if (this.valid) {
        localStorage.ids = this.ids.join(",");
        this.$emit("update:playlist-ids", this.ids);
      }
    },
    remove(index) {
      this.ids.splice(index, 1);
    },
    onUrlChanged() {
      const match = this.url.match(/PL[A-Za-z0-9-]{16,32}/g);
      console.log("match:", match);
      if (match) {
        this.ids = uniq(this.ids.concat(match));
        this.url = "";
      }
    },
    search() {
      console.log("search", this.q);
      api.searchPlaylist(this.q).then(results => {
        this.searchResults = results;
      });
    }
  },
  watch: {
    url: "onUrlChanged"
  }
};
</script>
<style scoped>
.title {
  background-color: #444;
  color: #fff;
  line-height: 56px;
  position: relative;
  text-align: center;
}
.icon {
  height: 36px;
  left: 10px;
  position: absolute;
  top: 10px;
}
.settings {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #eee;
  color: black;
}
.btn-youtube {
  width: calc(100% - 50px);
}

.close {
  position: absolute;
  color: #ccc;
  top: 50%;
  height: 30px;
  line-height: 30px;
  width: 30px;
  text-align: center;
  transform: translateY(-15px);
  right: 15px;
}
.close:hover {
  color: red;
}

.form {
  padding: 0 20px;
  display: block;
}
.btn-save {
  float: right;
}
.mui-panel {
  color: black;
  margin: 0;
}
.list-item {
  margin: 20px;
}
.content {
  flex: 1;
  padding-top: 0;
}
a {
  color: red;
}
a:hover, a:active, a:focus {
  color: darkred;
}
ol {
  padding-inline-start: 15px;
}
</style>
