<script setup>
const radioList = [
  {
    id: 0,
    title: '杰倫之夜第三張半開始，買不到票這邊免費啦~',
    url: 'https://www.youtube.com/watch?v=bpUVF305gC4&ab_channel=%E6%B9%AF%E7%91%AA%E5%A3%AB%E5%A4%A7%E5%8F%94'
  },
  {
    id: 2,
    title: '我們是快樂的脫光家族 每天晚上這個時候 / 來個經典華語',
    url: 'https://www.youtube.com/watch?v=w_OmK_3-SIo&ab_channel=%E6%B9%AF%E7%91%AA%E5%A3%AB%E5%A4%A7%E5%8F%94'
  },
  {
    id: 3,
    title: '下雨夜 抒情夜 我們是快樂的脫光家族',
    url: 'https://www.youtube.com/watch?v=mOhGOrRA3-w&ab_channel=%E6%B9%AF%E7%91%AA%E5%A3%AB%E5%A4%A7%E5%8F%94'
  },
  {
    id: 4,
    title: '杰倫之夜第四張半開始，買不到票這邊免費啦~到底能播幾集啦XXD',
    url: 'https://www.youtube.com/watch?v=954OB42O3gs&ab_channel=%E6%B9%AF%E7%91%AA%E5%A3%AB%E5%A4%A7%E5%8F%94'
  }
]
</script>

<template>
  <main class="main">
    <section class="block">
      <h3 class="page-title">【有緣人電台】</h3>

      <ul class="radio-list" v-auto-animate>
        <li v-for="item in radioList" :key="`radio${item.id}`" class="row-item role-grid">
          <RouterLink :to="item.url" class="link" targrt="_blank" :title="item.title">
            {{ item.title }}
          </RouterLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.radio-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .link {
    color: var(--color-text);
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-base);
    }
  }
}
</style>
