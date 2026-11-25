<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import { ArrowRight, ArrowLeft, Check, CircleCheck, CircleX } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import { school } from '../data.js'
const stage = ref('edit')
const summary = ref(null)
const failureNotice = ref(null)
const form = reactive({ type: '入学について', name: '', email: '', country: '', message: '', consent: false })
const submitting = ref(false)
const error = ref('')
const honey = ref('')
async function confirm() {
  error.value = ''
  stage.value = 'confirm'
  await nextTick()
  summary.value?.focus()
}
async function send() {
  if (submitting.value || stage.value !== 'confirm') return
  if (!form.consent || !form.name || !form.email || !form.message || honey.value) {
    error.value = '入力内容をご確認ください。'
    return
  }
  submitting.value = true
  error.value = ''
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${school.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify({
        name: form.name, email: form.email, country: form.country || '未入力',
        message: form.message, 'お問い合わせ種別': form.type,
        _subject: `【${school.name}】${form.type}`,
        _replyto: form.email, _template: 'table', _captcha: 'false',
        _honey: honey.value, _url: window.location.href,
      }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error('submission_failed')
    if (/activat|confirm your email/i.test(result.message || '')) {
      stage.value = 'activation'
    } else if (result.success === true || result.success === 'true') {
      stage.value = 'success'
    } else {
      throw new Error('submission_failed')
    }
    await nextTick()
    summary.value?.focus()
  } catch (cause) {
    error.value = cause.name === 'AbortError'
      ? '通信がタイムアウトしました。受付状況を確認できませんでした。時間をおいて学校へご確認ください。'
      : '送信を確認できませんでした。入力内容は保持されています。通信状況をご確認のうえ、再度お試しいただくか、お電話でお問い合わせください。'
    await nextTick()
    failureNotice.value?.focus()
  } finally {
    clearTimeout(timeout)
    submitting.value = false
  }
}
</script>
<template>
  <PageHeading title="お問い合わせ" eyebrow="CONTACT US" description="入学相談・資料請求など、お気軽にお問い合わせください。" /><section class="section"><div class="container contact-content"><h2>あなたの「知りたい」を<br class="mobile-only" />お聞かせください。</h2><p>内容を確認のうえ、担当者よりご連絡いたします。<br />＊は必須項目です。</p><div class="contact-methods"><a :href="school.phoneHref"><span>お電話でのお問い合わせ</span><strong>{{ school.phone }}</strong></a><div><span>メールアドレス</span><strong>{{ school.email }}</strong></div></div><p>受付時間：{{ school.receptionHours }}<br />定休日：{{ school.closedDays }}</p><p class="form-notice">下記フォームで内容をご確認のうえ、このページからお問い合わせを送信できます。</p>
    <form v-if="stage === 'edit'" class="contact-form" @submit.prevent="confirm">
      <div class="form-honeypot" aria-hidden="true"><label for="inquiry-website">Website</label><input id="inquiry-website" v-model="honey" name="website" autocomplete="off" tabindex="-1" /></div>
      <div class="field"><label for="inquiry-type">お問い合わせ種別 <span>＊</span></label><select id="inquiry-type" v-model="form.type" required><option>入学について</option><option>学習コースについて</option><option>学校見学について</option><option>資料請求</option><option>その他</option></select></div>
      <div class="field"><label for="inquiry-name">お名前 <span>＊</span></label><ElInput id="inquiry-name" v-model.trim="form.name" name="name" autocomplete="name" placeholder="例：山田 花子" required maxlength="100"  size="large" /></div>
      <div class="field"><label for="inquiry-email">メールアドレス <span>＊</span></label><ElInput id="inquiry-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" placeholder="example@email.com" required maxlength="254"  size="large" /></div>
      <div class="field"><label for="inquiry-country">国・地域</label><ElInput id="inquiry-country" v-model.trim="form.country" name="country" autocomplete="country-name" placeholder="国・地域をご入力ください" maxlength="100"  size="large" /></div>
      <div class="field"><label for="inquiry-message">お問い合わせ内容 <span>＊</span></label><ElInput type="textarea" id="inquiry-message" v-model.trim="form.message" name="message" :rows="6" placeholder="ご相談内容をご入力ください" required maxlength="5000" /></div>
      <label class="consent"><input v-model="form.consent" type="checkbox" required /><span><RouterLink to="/privacy/" target="_blank">個人情報の取り扱い</RouterLink>に同意する</span></label>
      <ElButton class="button button-primary" type="primary" native-type="submit" size="large">入力内容を確認する</ElButton>
    </form>
    <div v-else-if="stage === 'confirm'" ref="summary" class="contact-summary" tabindex="-1" :aria-busy="submitting">
      <h3><Check :size="22" />入力内容の確認</h3>
      <dl><div v-for="(label, key) in { type: 'お問い合わせ種別', name: 'お名前', email: 'メールアドレス', country: '国・地域', message: 'お問い合わせ内容' }" :key="key"><dt>{{ label }}</dt><dd>{{ form[key] || '未入力' }}</dd></div></dl>
      <p>内容をご確認のうえ、「送信する」を押してください。</p>
      <div v-if="error" ref="failureNotice" class="form-error" role="alert" tabindex="-1"><h3 class="submission-status-title"><CircleX :size="28" aria-hidden="true" />送信失敗！</h3><p>{{ error }}</p></div>
      <div class="confirmation-actions"><button class="button button-outline" :disabled="submitting" @click="stage = 'edit'; error = ''"><ArrowLeft :size="16" />入力を修正する</button><ElButton class="button button-primary" type="primary" :loading="submitting" :disabled="submitting" @click="send">{{ submitting ? '送信中…' : '送信する' }}</ElButton></div>
    </div>
    <div v-else ref="summary" class="contact-summary submission-result" tabindex="-1" role="status">
      <template v-if="stage === 'success'"><h2 class="submission-status-title submission-success"><CircleCheck :size="36" aria-hidden="true" />送信成功！</h2><p>お問い合わせを受け付けました。<br />内容を確認のうえ、担当者よりご連絡いたします。<br />お返事までしばらくお待ちください。</p></template>
      <template v-else><h2 class="submission-status-title submission-failure"><CircleX :size="36" aria-hidden="true" />送信失敗！</h2><p>学校側で受信設定の確認が必要です。送信完了を確認できませんでした。お急ぎの場合は、お電話でお問い合わせください。</p></template>
      <RouterLink to="/" class="button button-outline">ホームに戻る <ArrowRight :size="16" /></RouterLink>
    </div>
  </div></section>
</template>
