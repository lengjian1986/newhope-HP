// @vitest-environment node
import { describe, test, expect } from 'vitest'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

function htmlFiles(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? htmlFiles(path) : name.endsWith('.html') ? [path] : []
  })
}

describe('prerendered production output', () => {
  test('every page contains real content, local images and working internal targets', () => {
    const files = htmlFiles('dist')
    expect(files.length).toBe(17)
    for (const file of files) {
      const html = readFileSync(file, 'utf8')
      expect(html, file).toContain('<h1')
      expect(html, file).toContain('id="school-banner"')
      expect(html, file).not.toContain('<!--app-html-->')
      for (const match of html.matchAll(/(?:src|href)="([^"#]+)(?:#[^"]*)?"/g)) {
        const target = match[1].split('#')[0]
        if (!target.startsWith('/')) continue
        const base = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '')
        expect(!base || target.startsWith(`${base}/`), `${file}: ${target} must use the deployment base`).toBe(true)
        const path = join('dist', base ? target.slice(base.length) : target)
        expect(existsSync(path), `${file}: ${target}`).toBe(true)
        if (target.endsWith('/')) expect(existsSync(join(path, 'index.html')), `${file}: ${target}`).toBe(true)
      }
    }
  })
})
