<script setup>
import { assets, teachers } from '../data.js'
</script>
<template>
  <section id="teachers" class="section teachers-section">
    <div class="container">
      <p class="eyebrow">OUR TEACHERS</p><h2>あなたの一歩に、<br class="mobile-only" />寄り添う先生たち。</h2>
      <p class="section-intro">日本語の学習も、毎日の小さな相談も。安心して学べる環境を、一緒につくります。</p>
      <div class="teacher-grid">
        <article v-for="(teacher, i) in teachers" :key="teacher.role" class="teacher-profile">
          <img :src="assets.teachers[i]" :alt="`${teacher.role}のイメージ（AI生成）`" loading="lazy" width="786" height="620" />
          <p class="teacher-role">{{ teacher.role }}</p><h3>氏名：正式情報を掲載予定</h3><p class="teacher-focus">担当分野：{{ teacher.focus }}</p><p class="teacher-message">「{{ teacher.message }}」</p>
        </article>
      </div>
      <p class="image-note">※ 写真はAIで生成した架空の日本人女性教師のイメージです。氏名・経歴・担当科目は正式資料に差し替えます。</p>
    </div>
  </section>
</template>
