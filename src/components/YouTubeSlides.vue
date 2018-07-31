<template>
    <div class="swiper-container yt-slides-container">
        <div class="swiper-wrapper yt-slides-wrapper">
            <div class="yt-slides-slide swiper-slide"
              v-for="(id,i) in virtualSwiperData.slides"
              :class="{ active: virtualSwiperData.from + i === index }"
              :key="id"
              :style="{left: `${virtualSwiperData.offset}px`}"
              @click="click(id)"
            >
                <YouTubeImage 
                    :show-button="true"
                    :video-id="id"
                />
            </div>
        </div>
        
        <slot name="controls">
            <div class="yt-slides-controls">
                <div class="yt-slides-prev btn"><i class="material-icons youtube-icon">skip_previous</i></div>
                <div class="yt-slides-next btn"><i class="material-icons youtube-icon">skip_next</i></div>
            </div>
        </slot>
    </div>
</template>

<script>
import YouTubeImage from "./YouTubeImage.vue";

import "swiper/dist/css/swiper.css";
import { Swiper, Navigation, Virtual } from "swiper/dist/js/swiper.esm.js";

// Install modules
Swiper.use([Navigation, Virtual]);

export default {
  name: "YouTubeSlides",
  components: { YouTubeImage },
  props: {
    videoIds: Array,
    index: Number
  },
  mounted() {
    this.initSwiper();
  },
  destroyed() {
    if (this.swiper) this.swiper.destroy();
  },
  data() {
    return {
      swiperIndex: 0,
      swiper: null,
      swiperTranslateX: 0,
      virtualSwiperData: {
        slides: [],
        left: 0
      }
    };
  },
  computed: {
    translateX() {
      const offsetWidth =
        this.swiper && this.swiper.activeIndex > 0 ? this.swiper.width : 0;
      return (
        this.swiperTranslateX + this.virtualSwiperData.offset + offsetWidth
      );
    }
  },
  methods: {
    setVideoIds() {
      this.virtualSwiperData.slides = this.videoIds || [];
      if (this.swiper) {
        this.swiper.virtual.slides = this.videoIds || [];
        this.swiper.virtual.update();
        this.swiper.update();
      } else {
        this.initSwiper();
      }
    },
    setIndex(index) {
      this.swiperIndex = index;
      if (this.swiper) {
        this.swiper.slideTo(index, 0);
      }
    },
    initSwiper() {
      window.sw = this.swiper = new Swiper(this.$el, {
        touchRatio: 1,
        initialSlide: this.swiperIndex,
        nested: true,
        speed: 600,
        navigation: {
          nextEl: ".yt-slides-next",
          prevEl: ".yt-slides-prev"
        },
        virtual: {
          slides: this.videoIds || [],
          renderExternal: data => {
            this.virtualSwiperData = data;
          }
        }
      });
      this.swiper.on("setTranslate", x => {
        this.swiperTranslateX = x;
      });
      this.swiper.slideTo(this.swiperIndex, 0, true);
      this.swiper.on("slideChange", () => {
        this.swiperIndex = this.swiper.activeIndex;
        this.$emit("slide-change", this.swiperIndex);
      });
    },
    click(id) {
      this.$emit("video-id", id);
    }
  },
  watch: {
    videoIds: "setVideoIds",
    index: "setIndex",
    translateX(x) {
      this.$emit("translate-x", x);
    }
  }
};
</script>
<style lang="css">
.yt-slides-container,
.yt-slides-wrapper,
.yt-slides-slide {
  height: 100% !important;
}
.yt-slides-container {
  background-color: black;
}
.yt-slides-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.yt-slides-controls {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 10;
  height: 60px;
  background: rgba(55, 55, 55, 0.6);
}
.yt-slides-next {
  float: right;
}
.yt-slides-controls .btn {
  color: white;
  display: inline-block;
  height: 60px;
  width: 60px;
  text-align: center;
  cursor: pointer;
}
.yt-slides-controls .btn.yt-slides-button-disabled {
  color: rgba(255, 255, 255, 0.3);
}
.yt-slides-controls .btn i {
  font-size: 40px;
  line-height: 60px;
}
.yt-slides-controls .btn:hover {
  background: red;
}
</style>
