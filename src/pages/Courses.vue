<script setup>
import { ArrowRight } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import { courses } from '../data.js'
</script>
<template>
  <PageHeading title="学習コース" eyebrow="JAPANESE LANGUAGE COURSES" description="目標に合わせた学びで、次のステージへ。" />
  <section class="section"><div class="container content-flow"><div><h2>あなたに合ったコースを見つける</h2><p>日本での進学、コミュニケーション、文化への理解。目的とレベルに合わせて学べます。</p></div><div class="feature-grid course-grid"><article v-for="course in courses" :key="course.slug" class="feature-panel"><h3>{{ course.title }}</h3><p>{{ course.description }}</p><RouterLink :to="`/courses/${course.slug}/`" class="text-link">コース詳細を見る <ArrowRight :size="16" /></RouterLink></article></div><div><h2>レベルに合わせて、<br class="mobile-only" />着実にステップアップ</h2><ol class="level-steps"><li v-for="level in ['初級', '初中級', '中級', '上級']" :key="level">{{ level }}</li></ol><p>入学時のレベルチェックで、あなたに合ったクラスをご案内します。</p></div><div><h2>学びを支えるサポート</h2><p>日本語能力試験対策 ／ 個別面談 ／ 学習アドバイス ／ 進路相談</p></div></div></section>
</template>
