<script setup>
import { ArrowRight, Plus } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
const steps = [['お問い合わせ・相談', 'コースや入学時期についてご相談ください。'], ['出願書類の準備', '募集要項をご確認のうえ、必要書類をご準備ください。'], ['選考・入学手続き', '書類確認・面接などを経て、入学手続きをご案内します。'], ['来日・学校生活のスタート', 'オリエンテーションで、学習と生活の準備を整えます。']]
const questions = [['日本語の学習経験が少なくても大丈夫ですか？', '学習歴と目標を伺い、適切なコースをご案内します。'], ['入学時期や学費について知りたいです。', '最新の募集要項をご確認いただくか、学校までお問い合わせください。']]
</script>
<template>
  <PageHeading title="入学案内" eyebrow="ADMISSIONS" description="新しい学びへの第一歩を、ここから。" /><section class="section"><div class="container content-flow"><div><h2>入学までの流れ</h2><p>出願から来日・入学まで、スタッフが丁寧にサポートします。</p></div><ol class="admission-steps"><li v-for="(step, i) in steps" :key="step[0]"><span>{{ String(i + 1).padStart(2, '0') }}</span><div><h3>{{ step[0] }}</h3><p>{{ step[1] }}</p></div></li></ol><div><h2>出願に必要な書類</h2><p>入学願書 ／ 最終学歴に関する書類 ／ 日本語学習歴に関する書類 ／ その他指定書類</p><p>必要書類は国・地域やコースによって異なります。詳細はお問い合わせください。</p><RouterLink to="/contact/" class="text-link">出願について相談する <ArrowRight :size="16" /></RouterLink></div><div><h2>よくあるご質問</h2><div class="faq"><details v-for="question in questions" :key="question[0]" open><summary><span>Q.</span>{{ question[0] }}<Plus :size="18" /></summary><p>{{ question[1] }}</p></details></div></div></div></section>
</template>
