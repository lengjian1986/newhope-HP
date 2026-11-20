<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import NotFound from './NotFound.vue'
import { news } from '../data.js'
const route = useRoute()
const index = computed(() => news.findIndex(item => item.slug === route.params.slug))
const item = computed(() => news[index.value])
</script>
<template>
  <template v-if="item"><PageHeading title="お知らせ詳細" eyebrow="NEWS & EVENTS" description="学校の日々をお届けします。" /><article class="section"><div class="container article-content"><p class="news-meta"><time :datetime="item.date.replaceAll('.', '-')">{{ item.date }}</time><span>/　{{ item.category }}</span></p><h2 class="article-title">{{ item.title }}</h2><p class="article-lead preserve-lines">{{ item.lead }}</p><img v-if="item.image" :src="item.image" :alt="item.title" class="article-image" width="1700" height="1000" /><h3>{{ item.heading }}</h3><p class="preserve-lines">{{ item.body }}</p><p class="image-note">※ 掲載内容はデザイン確認用のサンプルです。</p><nav class="article-navigation" aria-label="お知らせ間の移動"><RouterLink v-if="index > 0" :to="`/news/${news[index - 1].slug}/`"><ArrowLeft :size="16" />前のお知らせ</RouterLink><span v-else></span><RouterLink to="/news/">一覧に戻る</RouterLink><RouterLink v-if="index < news.length - 1" :to="`/news/${news[index + 1].slug}/`">次のお知らせ<ArrowRight :size="16" /></RouterLink><span v-else></span></nav></div></article></template><NotFound v-else />
</template>
