<script setup>
import PageHeading from '../components/PageHeading.vue'
import AtmosphereSection from '../components/AtmosphereSection.vue'
import TeacherSection from '../components/TeacherSection.vue'
import AccessSection from '../components/AccessSection.vue'
import { school } from '../data.js'
const features = [['01 少人数で学ぶ', '先生との距離が近く、質問しやすい学習環境。'], ['02 体験から学ぶ', 'アートや地域交流を通じて、生きた日本語に触れます。'], ['03 未来へつなぐ', '進学や日々の生活まで、一人ひとりをサポート。']]
</script>
<template>
  <PageHeading title="学校案内" eyebrow="ABOUT OUR SCHOOL" description="日本語でつながる、新しい世界。大阪で、あなたの夢を育てます。" />
  <section class="section"><div class="container content-flow"><div><h2>一人ひとりの未来に、<br class="mobile-only" />寄り添う学校。</h2><p>ニューホープ言語学校では、日本語の学習と文化体験を通して、自分らしい未来を切り開く力を育みます。</p></div><div class="feature-grid"><article v-for="feature in features" :key="feature[0]" class="feature-panel"><h3>{{ feature[0] }}</h3><p>{{ feature[1] }}</p></article></div><div><h2>校長メッセージ</h2><p>言葉を学ぶことは、新しい可能性に出会うこと。皆さんと大阪でお会いできることを楽しみにしています。</p></div><div><h2>学校概要</h2><dl class="school-overview"><div><dt>学校名</dt><dd>ニューホープ言語学校</dd></div><div><dt>所在地</dt><dd>{{ school.address }}</dd></div><div><dt>英語名</dt><dd>{{ school.englishName }}</dd></div><div><dt>TEL</dt><dd><a :href="school.phoneHref">{{ school.phone }}</a></dd></div><div><dt>Email</dt><dd><a :href="`mailto:${school.email}`">{{ school.email }}</a></dd></div><div><dt>教育内容</dt><dd>日本語教育・進学指導・日本文化体験</dd></div></dl></div></div></section>
  <AtmosphereSection /><TeacherSection /><AccessSection />
</template>
