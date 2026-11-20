<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import NotFound from './NotFound.vue'
import { courses } from '../data.js'
const route = useRoute()
const course = computed(() => courses.find(item => item.slug === route.params.slug))
</script>
<template>
  <template v-if="course"><PageHeading :title="`${course.title}詳細`" eyebrow="COURSE DETAILS" :description="course.tagline" /><section class="section"><div class="container content-flow"><div><h2>{{ course.intro }}</h2><p>{{ course.body }}</p></div><div class="feature-grid"><article v-for="topic in course.topics" :key="topic[0]" class="feature-panel"><h3>{{ topic[0] }}</h3><p class="preserve-lines">{{ topic[1] }}</p></article></div><div><h2>カリキュラム</h2><dl class="curriculum"><div><dt>基礎を固める</dt><dd>語彙・文法・コミュニケーション</dd></div><div><dt>応用力を育てる</dt><dd>読解・作文・発表</dd></div><div><dt>次の一歩へ</dt><dd>目標に合わせた学習・個別相談</dd></div></dl></div><div id="requirements"><h2>募集要項・学費</h2><p>入学時期・学習期間・学費の正式情報は、最新の募集要項でご確認ください。</p><p class="muted">募集要項は準備中です。詳細は学校までお問い合わせください。</p><RouterLink to="/contact/" class="text-link">募集要項について問い合わせる <ArrowRight :size="16" /></RouterLink></div><RouterLink to="/courses/" class="text-link"><ArrowLeft :size="16" /> 学習コース一覧に戻る</RouterLink></div></section></template><NotFound v-else />
</template>
