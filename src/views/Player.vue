<template>
    <div class="player">
        <YouTube v-if="shouldLoadYouTube"
            class="youtube"
            :class="{ unclickable: !canClickYouTube }"
            :video-id="state.videoId" 
            :player-vars="{ 
              autoplay: 1, 
              controls: 0, 
              modestbranding: 1, 
              rel: 0, 
              showinfo: 0, 
              enablejsapi: 1 
            }"
            @ready="onReady"
            @paused="onPaused"
            @buffering="onBuffering"
            @playing="onPlaying"
            @ended="onEnded"
            :style="{ transform: `translateX(${translateX}px)`}"
        ></YouTube>
        <YouTubeSlides 
          :video-ids="state.videoIds"
          :index="videoIndex" 
          class="slides"
          :class="{ transparent: !showSlides, unclickable: canClickYouTube }"
          @video-id="clickVideoId($event)"
          @translate-x="translateX = $event"
          @slide-change="onSlideChange"
        >
        <template slot="controls">

      <transition name="zoof">
          <div class="yt-slides-controls" 
            v-show="showControls"
            :class="{ clickable: firstPlay && canClickYouTube }"
            >
            <div class="yt-slides-prev btn"><i class="material-icons youtube-icon">skip_previous</i></div>
            <div class="btn" @click="gotoHome"><i class="material-icons youtube-icon">home</i></div>
            <div class="yt-slides-next btn"><i class="material-icons youtube-icon">skip_next</i></div>
          </div>

      </transition>
        </template>
      </YouTubeSlides>
      <transition name="fade">
        <div class="btn btn-pause" v-show="showPause" @click="pause">
          <i class="material-icons youtube-icon">pause</i>
        </div>
      </transition>
    </div>
</template>

<script>
import YouTube from "../components/YouTube.vue";
import YouTubeSlides from "../components/YouTubeSlides.vue";
import state from "../model/state";

export default {
  name: "Player",
  components: { YouTube, YouTubeSlides },
  data() {
    return {
      state,
      translateX: 0,
      shouldLoadYouTube: false,
      canClickYouTube: true,
      player: null,
      playing: true,
      firstPlay: false
    };
  },
  computed: {
    showSlides(){
      return this.firstPlay && !this.playing;
    },
    showControls(){
      return this.firstPlay && (!this.playing || this.canClickYouTube);
    },
    showPause(){
      return this.firstPlay && this.playing && this.canClickYouTube;
    },
    videoIndex() {
      console.log(
        "videoIndex",
        this.state.videoIds.indexOf(this.state.videoId)
      );
      return this.state.videoIds.indexOf(this.state.videoId);
    }
  },
  methods: {
    gotoHome() {
      this.state.playlistId = null;
      this.state.videoId = null;
    },
    onReady(player) {
      this.player = player;
    },
    onPlaying() {
      this.canClickYouTube = false;
      this.playing = true;
      this.firstPlay = true;
    },
    onPaused() {
      // this.$data.canClickYouTube = false;
      this.playing = false;
    },
    onBuffering() {
      this.playing = true;
    },
    onSlideChange() {
      this.playing = false;
      if (this.player) {
        // this.state.videoId = this.state.videoIds[index];
        // this.player.loadVideoById({ videoId: this.state.videoId });
        this.player.pauseVideo();
      }
    },
    onEnded() {
      this.playing = false;
      if (this.videoIndex < this.state.videoIds.length - 1) {
        this.state.videoId = this.state.videoIds[this.videoIndex + 1];
      }
    },
    clickVideoId(id) {
      if (this.player) {
        if (id !== this.state.videoId) {
          this.player.loadVideoById({ videoId: id });
        }
        if (this.playing) {
          if(this.firstPlay) {
            this.canClickYouTube = true;
            setTimeout(() => {
              this.canClickYouTube = false;
            }, 1500);
          }
        } else {
          this.player.playVideo();
          this.playing = true;
        }
      }
      this.state.videoId = id;
    },
    pause() {
      this.playing = false;
      if(this.player) this.player.pauseVideo();
    },
    setShouldLoadYouTube() {
      if (state.videoId) {
        this.shouldLoadYouTube = true;
      }
    }
  },
  watch: {
    "state.videoId": "setShouldLoadYouTube",
    canClickYouTube: function(val) {
      console.log("canClickYouTube", val);
    }
  }
};
</script>
<style lang="css">
.player {
  background: black;
  position: relative;
  width: 100%;
  height: 100%;
}
.player .youtube,
.player .slides {
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.btn-pause {
  position: absolute;
  width: 66px;
  height: 66px;
  background: rgba(0,0,0,0.7);
  border-radius: 33px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-33px,-33px);
}
.btn-pause:hover {
  background: red;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.zoof-enter-active, .zoof-leave-active {
  transition: transform .3s;
}
.zoof-enter, .zoof-leave-to {
  transform: translateY(60px);
}

.btn-pause i {
  line-height: 66px;
  font-size: 40px;
}
.yt-slides-container.transparent {
  background: none !important;
}
.transparent .yt-slides-slide.active {
  opacity: 0;
  /* border: 10px solid red;
  box-sizing: border-box; */
}
.invisible {
  /* transition: opacity 1000ms; */
  /* opacity: 0.0 !important; */
  visibility: hidden;
  pointer-events: none;
}
.clickable {
  pointer-events: all;
}
.unclickable {
  pointer-events: none;
}
.youtube.paused {
  pointer-events: none;
}
</style>
