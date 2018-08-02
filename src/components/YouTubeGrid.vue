<template>
  <div class="grid mui-container-fluid" v-if="ids.length > 0">
    <div class="mui-row">
      <PlaylistInfo 
        class="col mui-col-xs-12"
        :playlist-id="playlistId">
          <template slot="loading">&nbsp;</template>
      </PlaylistInfo>
    </div>
    <div class="mui-row">
      <div :to="`/${playlistId}/${i}`" class="col mui-col-xs-6 mui-col-sm-6 mui-col-md-4 mui-col-lg-3" v-for="(id,i) in visibleIds"   v-bind:key="id" @click="click(id)">
        <YouTubeImage class="thumb" :video-id="id" />
      </div>
    </div>
    <div class="mui-row" v-show="length < ids.length">
      <div class="col mui-col-xs-12"
          @click="clickMore"
          >
          <button class="more-btn mui-btn mui-btn--raxised mui-btn--danger">
            SHOW MORE {{title}}
          </button>
      </div>
    </div>
  </div>
</template>
<script>
import YouTubeImage from "./YouTubeImage.vue";
import PlaylistInfo from "./PlaylistInfo.vue";
import api from "../model/api";
import state from "../model/state";

export default {
  name: "YouTubeGrid",
  components: { YouTubeImage, PlaylistInfo },
  props: {
    playlistId: String
  },
  data() {
    return {
      ids: [],
      title: "",
      description: "",
      length: 12
    };
  },
  created() {
    this.setPlaylistId(this.playlistId);
  },
  computed: {
    visibleIds() {
      return this.ids.slice(0, this.length);
    }
  },
  methods: {
    click(videoId) {
      state.playlistId = this.playlistId;
      state.videoIds = this.ids;
      state.videoId = videoId;
      console.log(state);
    },
    setPlaylistId(playlistId) {
      console.log("setPlaylistId", playlistId);
      this.playlistId = playlistId;
      api.getVideoIds(this.playlistId).then(ids => {
        this.ids = ids;
      });
      api.getPlaylistInfo(this.playlistId).then(result => {
        this.title = result.title;
        this.description = result.description;
      });
      this.length = 12;
    },
    clickMore() {
      this.length = Math.min(this.ids.length, this.length + 12);
    }
  },
  watch: {
    playlistId: "setPlaylistId"
  }
};
</script>
<style scoped>
.thumb {
  margin: 15px 0;
}
.grid {
  margin-top: 15px;
  margin-bottom: 50px;
}
.more-btn {
  width: 100%;
}
/* .playlist-info.loading {
  display: none;
} */
</style>
