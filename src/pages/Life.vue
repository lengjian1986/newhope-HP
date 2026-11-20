<script setup>
import PageHeading from '../components/PageHeading.vue'
import { assets } from '../data.js'
const features = [['文化を体験する', '書道やアートを通して、日本の文化と表現を楽しみます。'], ['仲間とつながる', '学校行事や交流活動が、新しい出会いのきっかけに。'], ['大阪で暮らす', '地域の人とのふれあいを通して、生きた日本語を学びます。']]
const seasons = [['春', '入学・オリエンテーション'], ['夏', '交流活動・文化体験'], ['秋', '校外学習・アート活動'], ['冬', '学習成果発表・卒業に向けた準備']]
</script>
<template>
  <PageHeading title="学校生活" eyebrow="LIFE AT NEW HOPE" description="教室の外にも、学びと出会いが広がっています。" /><section class="section"><div class="container content-flow"><div><h2>日本語で、毎日が少しずつ<br class="mobile-only" />豊かになる。</h2><p>多様な国の仲間とともに過ごす時間。日々の会話や体験が、かけがえのない学びになります。</p></div><img class="life-art" :src="assets.art" alt="書道とアートによる日本文化体験" width="1644" height="880" /><div class="feature-grid"><article v-for="feature in features" :key="feature[0]" class="feature-panel"><h3>{{ feature[0] }}</h3><p>{{ feature[1] }}</p></article></div><div><h2>一年の楽しみ</h2><dl class="season-list"><div v-for="season in seasons" :key="season[0]"><dt>{{ season[0] }}</dt><dd>{{ season[1] }}</dd></div></dl></div></div></section>
</template>
