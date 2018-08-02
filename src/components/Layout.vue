<template>
  <div class="app" :style="appStyle">
    <slot name="pages"></slot>
    <div class="swiper-container layout-swiper unclickable" 
      v-resize:debounce="onResize"
      :style="swiperStyle">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
        </div>
        <div class="swiper-slide clickable">
            <slot name="player"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import resize from "vue-resize-directive";
import "swiper/dist/css/swiper.css";
import {
  Swiper,
  Navigation,
  Scrollbar,
  Mousewheel
} from "swiper/dist/js/swiper.esm.js";

// Install modules
Swiper.use([Navigation, Scrollbar, Mousewheel]);

export default {
  name: "Layout",
  directives: {
    resize
  },
  mounted() {
    this.initSwiper();
    // ScrollFix(this.$refs.page);
  },
  props: {
    showPlayer: Boolean
  },
  data() {
    return {
      height: window.innerHeight,
      scrollable: !this.showPlayer
    };
  },
  computed: {
    swiperStyle() {
      return { height: `${this.height}px` };
    },
    appStyle() {
      if (this.scrollable) return {};
      return {
        overflow: "hidden",
        height: `${this.height}px`,
        "pointer-events": "none"
      };
    }
  },
  methods: {
    initSwiper() {
      window.sw1 = this.swiper = new Swiper(".layout-swiper", {
        touchRatio: 1,
        slidesPerView: "auto",
        direction: "vertical",
        speed: 800
      });
      this.swiper.allowTouchMove = false;
      this.swiper.on("transitionStart", () => {
        this.scrollable = this.swiper.activeIndex === 0;
        this.swiper.allowTouchMove = this.swiper.activeIndex > 0;
        if (this.swiper.activeIndex === 0) {
          this.$emit("swipe-home", true);
        } else {
          this.onResize();
        }
      });
    },
    onResize() {
      this.height = window.innerHeight;
      this.swiper.update();
    },
    setShowPlayer() {
      this.height = window.innerHeight;
      Vue.nextTick(() => {
        this.swiper.slideTo(this.showPlayer ? 1 : 0);
      });
    }
  },
  watch: {
    showPlayer: "setShowPlayer"
  }
};
</script>
<style scoped>
.unclickable {
  pointer-events: none;
}
.clickable {
  pointer-events: all;
}
.layout-swiper {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
