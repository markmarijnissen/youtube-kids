<template>
    <div class="yt-img-wrapper">
        <img class="yt-img" :src="src" :xxxstyle="style"/>
        <button
          v-if="showButton"
          class="yt-img-btn"
          style="
            position: absolute;
            left: 50%;
            top: 50%;
            width: 68px;
            height: 48px;
            transform: translate(-50%, -50%);
            transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
            z-index: 63;
            border: none;
            background-color: transparent;
            padding: 0;
            font-size: 100%;
            cursor: inherit;
            outline: 0;
          "
          aria-label="play">
          <svg
            height="100%"
            version="1.1"
            viewBox="0 0 68 48"
            width="100%">
            <path
              class="yt-img-btn-bg"
              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              fill="#212121"
              fill-opacity="0.8"/>
            <path
              d="M 45,24 27,14 27,34"
              fill="#fff"/>
          </svg>
        </button>
    </div>
</template>
<script>
const THUMBNAIL_BASE = "https://i.ytimg.com/vi";

export default {
  name: "YouTubeImage",
  props: {
    videoId: String,
    showButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    src() {
      return `${THUMBNAIL_BASE}/${this.videoId}/hqdefault.jpg`;
    },
    style() {
      return `background-image: url(${THUMBNAIL_BASE}/${
        this.videoId
      }/default.jpg)`;
    }
  }
};
</script>
<style>
.yt-img-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  cursor: pointer;
}
.yt-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.yt-img-wrapper:hover .yt-img-btn-bg {
  fill: #ff0000;
  fill-opacity: 1;
}
</style>
