<template>
    <div class="playlist-info" :class="{ loading: loading }">
        <slot name="content" v-if="!isLoading">
            <div class="mui--text-title title">{{title}}</div>
            <div class="mui--text-caption description" v-if="description">{{description}}</div>
        </slot>
        <slot v-if="!isLoading"></slot>
        <slot name="loading" v-if="isLoading">
            {{loading}}
        </slot>
    </div>
</template>
<script>
import api from "../model/api";

export default {
  name: "PlaylistInfo",
  props: {
    playlistId: String,
    loading: {
        type: String,
        default: "Loading..."
    }
  },
  created() {
    this.setPlaylistId();
  },
  data() {
    return {
      title: "",
      description: "",
      isLoading: true
    };
  },
  methods: {
    setPlaylistId() {
      this.isLoading = true;
      this.title = "";
      this.description = "";
      api.getPlaylistInfo(this.playlistId).then(result => {
        this.isLoading = false;
        this.title = result.title;
        this.description = result.description;
      });
    }
  },
  watch: {
    playlistId: "setPlaylistId"
  }
};
</script>
<style scoped>
.playlist-info {
  position: relative;
}
.list-item .description {
  color: #aaa;
}
.hide-description .description {
  display: none;
}
</style>