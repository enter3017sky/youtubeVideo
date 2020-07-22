<template>
  <div class="home">
    <VideoCard :videos="videos"></VideoCard>
    <div class="text-center">
      <!-- <paginate
        :page-count="20"
        :click-handler="functionName"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >></paginate> -->
    </div>
  </div>
</template>

<script>
  // import dayjs from "dayjs";
  import VideoCard from "../components/videoCard";

  export default {
    name: "home",
    components: {
      VideoCard
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
      this.fetchVideo().then(res => {
        this.videos = res.data.items;
      });
    },
    computed: {
      width() {
        return window.innerWidth;
      }
    },
    methods: {
      fetchVideo() {
        return this.$http.get("videos", {
          params: {
            part: "snippet,statistics",
            maxResults: "12",
            chart: "mostPopular",
            regionCode: "TW",
            // pageToken:'CAQQAA',  // 第五部開始
            // id:'1n5JTIZi5rI,vaxp4jo2tmA', // 不能跟chart共存
            key: "AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU"
          }
        });
      }
    }
  };
</script>
