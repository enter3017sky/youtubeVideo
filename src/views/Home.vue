<template>
  <div class="home">
    <div class="m-3 d-flex flex-wrap jc-center" v-if="videos">
      <div class="video px-2 mb-3" v-for="(item ,index) in videos" :key="index">
        <img :src="item.snippet.thumbnails.medium.url" />
        <div class="title ellipsis two-line p-1">{{item.snippet.title}}</div>
        <div class="channel-title p-1">{{item.snippet.channelTitle}}</div>
        <div class="d-flex p-1">
          <span class="flex-1">上傳日期:{{item.snippet.publishedAt | date}}</span>
          <span>觀看次數:{{views(item.statistics.viewCount)}}</span>
        </div>
      </div>
    </div>
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
    created() {
      this.$http
        .get(
          // "search?part=snippet&key=AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU&type=video&maxResults=12"
          "videos?part=snippet,contentDetails,topicDetails,statistics&chart=mostPopular&maxResults=12&key=AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU"
        )
        .then(res => {
          this.videos = res.data.items;
        });
    },
    computed: {},
    methods: {
      views(val) {
        let digit = this.getDigit(val);
        if (digit >= 4) {
          return Math.floor(val / Math.pow(10, 4)) + "萬次";
        } else if (digit >= 8) {
          return Math.floor(val / Math.pow(10, 8)) + "億次";
        } else {
          return val + '次';
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
* {
  box-sizing: border-box;
}
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

.home {

    .video {
      width: 25%;
      // padding: 10px;
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
</style>
