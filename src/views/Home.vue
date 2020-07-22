<template>
  <div class="home">
    <VideoCard :videos="videos"></VideoCard>
    <div class="text-center">
      <paginate
        :page-count="20"
        :click-handler="functionName"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >></paginate>
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
      // IsFav(id) {
      //   // if(localStorage.id)
      //   return localStorage.id.includes(id);
      // },
      // toggleFavorite(id) {
      //   if (!localStorage.getItem("id")) {
      //     localStorage.setItem("id", JSON.stringify([]));
      //   }
      //   let idArray = JSON.parse(localStorage.id);
      //   if (idArray.indexOf(id) > -1) {
      //     idArray.splice(idArray.indexOf(id), 1); // 移除
      //   } else {
      //     idArray.push(id); // 加入
      //   }
      //   localStorage.id = JSON.stringify(idArray);
      //   this.$forceUpdate()
      // },
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
      // views(val) {
      //   let digit = this.getDigit(val);
      //   if (digit >= 4) {
      //     return Math.floor(val / Math.pow(10, 4)) + "萬次";
      //   } else if (digit >= 8) {
      //     return Math.floor(val / Math.pow(10, 8)) + "億次";
      //   } else {
      //     return val + "次";
      //   }
      // },
      // getDigit(integer) {
      //   let digit = -1;
      //   while (integer >= 1) {
      //     digit++;
      //     integer = integer / 10;
      //   }
      //   return digit;
      // }
    }
  };
</script>
