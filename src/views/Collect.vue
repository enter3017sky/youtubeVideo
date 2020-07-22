<template>
  <div class="collect">收藏頁</div>
</template>

<script>
  export default {
    created() {
      console.log("in ");
      this.$http.get(
        "videos",
        {
          params: {
            part: "snippet",
            maxResults: "12",
            chart: "mostPopular",
            key: "AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU"
          }
        }
        // "videos?part=snippet,contentDetails,topicDetails&chart=mostPopular&maxResults=12&key=AIzaSyAV_riwJ0Ow9XM9CaO3w2_2BDrxkU9rTEU"
      );
    }
  };
</script>
