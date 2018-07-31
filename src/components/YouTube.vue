<template>
    <div 
      class="youtube-player"
      v-resize:debounce="onResize"
      >
        <div :id="id"></div>
      </div>
</template>
<script>
const player = require("youtube-player");
import resize from "vue-resize-directive";

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

const EVENTS = {
  [UNSTARTED]: "unstarted",
  [PLAYING]: "playing",
  [PAUSED]: "paused",
  [ENDED]: "ended",
  [BUFFERING]: "buffering",
  [CUED]: "cued"
};

var COUNT = 0;

const tag = document.createElement("script");
tag.id = "iframe-demo";
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

export default {
  name: "Youtube",
  directives: {
    resize
  },
  props: {
    videoId: String,
    playerVars: {
      type: Object,
      default: () => ({})
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    thumbQuality: {
      type: String,
      default: "hq"
    }
  },
  data() {
    COUNT++;
    return {
      player: null,
      id: `ytvideo${COUNT}`,
      width: 640,
      height: 360
    };
  },
  mounted() {
    this.onResize();
    window.player = this.player = player(this.id, {
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    });

    this.player.on("ready", this.playerReady);
    this.player.on("stateChange", this.playerStateChange);
    this.player.on("error", this.playerError);
  },
  beforeDestroy() {
    this.destroyPlayer();
  },
  methods: {
    playerReady(e) {
      this.$emit("ready", e.target);
      // this.player.mute();
      if (this.playerVars.autoplay) this.player.playVideo();
    },
    playerStateChange(e) {
      if (e.data !== null && e.data !== UNSTARTED) {
        this.$emit(EVENTS[e.data], e.target);
      }
    },
    playerError(e) {
      this.$emit("error", e.target);
    },
    setVideoId(videoId) {
      if (!videoId) {
        this.player.stopVideo();
        return;
      }
      this.player.loadVideoById({ videoId });
    },
    onResize() {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
      if (this.player) this.player.setSize(this.width, this.height);
    },
    destroyPlayer() {
      if (this.player !== null && this.player.destroy) {
        this.player.destroy();
        this.player = null;
        COUNT++;
        this.id = `ytvideo${COUNT}`;
      }
    }
  },
  watch: {
    videoId: "setVideoId"
  }
};
</script>
<style scoped>
/* .youtube-wrapper:hover .ytp-large-play-button-bg {
  transition: fill 0.1s cubic-bezier(0, 0, 0.2, 1),
    fill-opacity 0.1s cubic-bezier(0, 0, 0.2, 1);
  fill: #f00;
  fill-opacity: 1;
} */
.youtube-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
