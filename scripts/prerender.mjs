import { readFile, mkdir, writeFile, rm } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { render } from '../.ssr/entry-server.js'

const root = resolve('dist')
const template = await readFile(join(root, 'index.html'), 'utf8')
const routes = ['/', '/about/', '/courses/', '/courses/academic/', '/courses/general/', '/courses/culture/', '/admissions/', '/life/', '/news/', '/news/spring-ceremony/', '/news/admissions-consultation/', '/news/calligraphy/', '/news/student-art/', '/news/school-visit/', '/contact/', '/privacy/', '/404/']
for (const route of routes) {
  const { html, title } = await render(route)
  const content = template.replace('<!--app-html-->', html).replace(/<title>.*?<\/title>/, `<title>${title}｜ニューホープ日本語学校</title>`)
  const output = route === '/404/' ? root : join(root, route)
  await mkdir(output, { recursive: true })
  await writeFile(join(output, route === '/404/' ? '404.html' : 'index.html'), content)
  console.log(`Prerendered ${route}`)
}
await writeFile(join(root, '_redirects'), '/* /index.html 200\n')
await rm(resolve('.ssr'), { recursive: true, force: true })
