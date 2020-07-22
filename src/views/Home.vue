<template>
  <div class="home">
    <div class="video-wrap m-3 d-flex flex-wrap jc-center" v-if="videos">
      <div class="video px-2 mb-4" v-for="(item ,index) in videos" :key="index">
        <div>
          <img :src="item.snippet.thumbnails.medium.url" />
          <div class="d-flex p-1">
            <div class="title ellipsis two-line flex-1">{{item.snippet.title}}</div>
            <span class="iconfont icon-heart pl-2 fs-xxl"></span>
            <!-- <span class="iconfont icon-heart1"></span> -->
          </div>
          <div class="channel-title p-1">{{item.snippet.channelTitle}}</div>
          <div class="d-flex p-1">
            <span class="flex-1">上傳日期:{{item.snippet.publishedAt | date}}</span>
            <span>觀看次數:{{views(item.statistics.viewCount)}}</span>
          </div>
          <!-- <div class="ellipsis five-line">
            {{item.snippet.description}}
          </div>-->
        </div>
      </div>
    </div>
    <paginate
      :page-count="20"
      :click-handler="functionName"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    :page-class="'page-item'">
    ></paginate>
  </div>
</template>

<script>
  import dayjs from "dayjs";

  export default {
    name: "home",
    filters: {
      date(val) {
        return dayjs(val).format("YYYY/MM/DD");
      }
    },
    data() {
      return {
        videos: null
      };
    },
    // mounted() {
    //   console.log(window.innerWidth);
    // },
    created() {
      this.$http
        .get(
          // "search?part=snippet&key=AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU&type=video&maxResults=12"
          "videos?part=snippet,contentDetails,topicDetails,statistics&chart=mostPopular&maxResults=8&key=AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU"
        )
        .then(res => {
          this.videos = res.data.items;
        });
    },
    computed: {
      width() {
        return window.innerWidth;
      }
    },
    methods: {
      views(val) {
        let digit = this.getDigit(val);
        if (digit >= 4) {
          return Math.floor(val / Math.pow(10, 4)) + "萬次";
        } else if (digit >= 8) {
          return Math.floor(val / Math.pow(10, 8)) + "億次";
        } else {
          return val + "次";
        }
      },
      getDigit(integer) {
        let digit = -1;
        while (integer >= 1) {
          digit++;
          integer = integer / 10;
        }
        return digit;
      }
    }
  };
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.two-line {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
.iconfont {
  &.icon-heart1 {
    color: red;
  }
}
.home {
  .video-wrap {
    padding: 0 20px;
    .video {
      width: 25%;
      > div {
        padding: 5px;
        box-shadow: 0 3px 16px rgba(0, 0, 0, 0.03);
        border: 1px solid map-get($colors, "light-1");
        height: 300px;
      }

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
      div {
        &.title {
          font-weight: bold;
        }
        &.channel-title {
        }
      }
    }
  }
}

@media (min-width: 1080px) {
  .home {
    .video {
      padding: 10px;
    }
  }
}
</style>
