<template>
    <div class="grid">
        <div class="mui-container-fluid">
          <div class="mui-row">
            <div class="col mui-col-xs-12">
                <div class="mui--text-title playlist-title">{{title}}</div>
                <div class="mui--text-caption" v-if="description">{{description}}</div>
            </div>
          </div>
          <div class="mui-row">
            <div :to="`/${playlistId}/${i}`" class="col mui-col-xs-6 mui-col-sm-6 mui-col-md-4 mui-col-lg-3" v-for="(id,i) in visibleIds"   v-bind:key="id" @click="click(id)">
              <YouTubeImage class="thumb" :video-id="id" />
            </div>
          </div>
          <div class="mui-row" v-show="!more && ids.length > 12">
            <div class="col mui-col-xs-12"
                @click="more = true"
                >
                <button class="more-btn mui-btn mui-btn--raxised mui-btn--danger">More...</button>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import YouTubeImage from "../components/YouTubeImage.vue";
import api from "../model/api";
import state from "../model/state";

export default {
  name: "Grid",
  components: { YouTubeImage },
  props: {
    playlistId: String
  },
  data() {
    return {
      ids: [],
      title: "",
      description: "",
      more: false
    };
  },
  created() {
    this.setPlaylistId(this.playlistId);
  },
  computed: {
    visibleIds() {
      return this.more ? this.ids : this.ids.slice(0, 12);
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
      this.more = false;
    }
  },
  watch: {
    playlistId: "setPlaylistId"
  }
};
</script>
<style scoped>
.playlist-title {
  padding-top: 15px;
}
.thumb {
  margin: 15px 0;
}
</style>
