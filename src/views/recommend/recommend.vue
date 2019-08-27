<template>
  <div>
    推荐
  </div>
</template>

<script>
import { getRecommend } from 'api/recommend';

export default {
  created() {
    getRecommend();
  }
};
</script>