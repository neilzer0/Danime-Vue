<template >
  <div class="card col-6 col-md-3 col-lg-2 text-center mb-3 bg-light border-0 text-decoration-none text-secondary">
    
      <img
        :src="anime.image_url"
        :alt="anime.title + ' Poster '"
        class="w-100 rounded mb-2"
      />
      <span class="font-weight-bold">{{ anime.title }}</span>
    
  </div>
</template>
<script>
export default {
  props: ["anime"],
};
</script>
<style lang="scss" scoped>
.card {
  padding: 0 8px;
  margin-bottom: 16px;

  img {
    box-shadow: 0px 4px 8px rgb(211, 156, 127);
    transition: 0.4s;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
    span {
      transition: 0.4s;
      color: rgb(255, 68, 0);
    }
  }
}
</style>
