<script setup>
import { ref, reactive, nextTick, computed } from 'vue'
import { ArrowRight, ArrowLeft, Check } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import { school } from '../data.js'
const stage = ref('edit')
const summary = ref(null)
const form = reactive({ type: '入学について', name: '', email: '', country: '', message: '', consent: false })
const notice = ref('')
const emailDraft = computed(() => {
  const body = `お問い合わせ種別：${form.type}\nお名前：${form.name}\nメールアドレス：${form.email}\n国・地域：${form.country || '未入力'}\n\n${form.message}`
  return `mailto:${school.email}?subject=${encodeURIComponent(`【${form.type}】${form.name}`)}&body=${encodeURIComponent(body)}`
})
async function confirm() {
  stage.value = 'confirm'
  await nextTick()
  summary.value?.focus()
}
function download() {
  const content = `お問い合わせ内容\n\n種別：${form.type}\nお名前：${form.name}\nメールアドレス：${form.email}\n国・地域：${form.country || '未入力'}\n\n${form.message}\n`
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'new-hope-inquiry.txt'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  notice.value = 'お問い合わせ内容を保存しました。学校への送信は行っていません。'
}
</script>
<template>
  <PageHeading title="お問い合わせ" eyebrow="CONTACT US" description="入学相談・資料請求など、お気軽にお問い合わせください。" /><section class="section"><div class="container contact-content"><h2>あなたの「知りたい」を<br class="mobile-only" />お聞かせください。</h2><p>内容を確認のうえ、担当者よりご連絡いたします。<br />＊は必須項目です。</p><div class="contact-methods"><a :href="school.phoneHref"><span>お電話でのお問い合わせ</span><strong>{{ school.phone }}</strong></a><a :href="`mailto:${school.email}`"><span>メールでのお問い合わせ</span><strong>{{ school.email }}</strong></a></div><p class="form-notice">下記フォームで内容をご確認のうえ、メールアプリを開いて学校へ送信できます。</p>
    <form v-if="stage === 'edit'" class="contact-form" @submit.prevent="confirm">
      <div class="field"><label for="inquiry-type">お問い合わせ種別 <span>＊</span></label><select id="inquiry-type" v-model="form.type" required><option>入学について</option><option>学習コースについて</option><option>学校見学について</option><option>資料請求</option><option>その他</option></select></div>
      <div class="field"><label for="inquiry-name">お名前 <span>＊</span></label><input id="inquiry-name" v-model.trim="form.name" name="name" autocomplete="name" placeholder="例：山田 花子" required maxlength="100" /></div>
      <div class="field"><label for="inquiry-email">メールアドレス <span>＊</span></label><input id="inquiry-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" placeholder="example@email.com" required maxlength="254" /></div>
      <div class="field"><label for="inquiry-country">国・地域</label><input id="inquiry-country" v-model.trim="form.country" name="country" autocomplete="country-name" placeholder="国・地域をご入力ください" maxlength="100" /></div>
      <div class="field"><label for="inquiry-message">お問い合わせ内容 <span>＊</span></label><textarea id="inquiry-message" v-model.trim="form.message" name="message" rows="6" placeholder="ご相談内容をご入力ください" required maxlength="5000"></textarea></div>
      <label class="consent"><input v-model="form.consent" type="checkbox" required /><span><RouterLink to="/privacy/" target="_blank">個人情報の取り扱い</RouterLink>に同意する</span></label>
      <button class="button button-primary" type="submit">入力内容を確認する <ArrowRight :size="18" /></button>
    </form>
    <div v-else ref="summary" class="contact-summary" tabindex="-1"><h3><Check :size="22" />入力内容の確認</h3><dl><div v-for="(label, key) in { type: 'お問い合わせ種別', name: 'お名前', email: 'メールアドレス', country: '国・地域', message: 'お問い合わせ内容' }" :key="key"><dt>{{ label }}</dt><dd>{{ form[key] || '未入力' }}</dd></div></dl><p class="form-notice">メールアプリで内容を確認して送信してください。フォームからの直接送信は行いません。</p><div class="confirmation-actions"><button class="button button-outline" @click="stage = 'edit'; notice = ''"><ArrowLeft :size="16" />入力を修正する</button><a class="button button-primary" :href="emailDraft">メールアプリで送信する <ArrowRight :size="16" /></a><button class="button button-outline" @click="download">内容を保存する <ArrowRight :size="16" /></button></div><p role="status">{{ notice }}</p></div>
  </div></section>
</template>
