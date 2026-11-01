# Report Analytics — Next.js 15 remote (Module Federation POC)

พิสูจน์ว่า microfrontend ที่ shell เป็น **Vite + React 19** สามารถ consume module ที่มาจาก
**Next.js (SSR framework)** ได้จริง ผ่าน Module Federation

| | |
|---|---|
| Port | `3002` |
| Framework | Next.js 15.1 (App Router) + React 19 |
| Exposes | `./ReportAnalytics` (webpack container, library type `var`) |
| Container URL | `http://localhost:3002/mf/remoteEntry.js` |
| Shell route | `/analytics/*` |

---

## 1. มี 2 ทางที่ Next.js ถูกใช้ในโมดูลนี้

**A. SSR จริง (standalone)** — `next start` เสิร์ฟหน้า `/` ที่ render บน Node server
(App Router + `dynamic = 'force-dynamic'`) แล้ว hydrate client island ต่อ
ใช้เมื่อต้องการ SEO / first paint / data fetching ฝั่ง server

**B. Federated island (client-only)** — component เดียวกัน expose ผ่าน Module Federation
ให้ shell import เข้าไป render ใน React tree ของ shell ที่ `/analytics`

> ข้อเท็จจริงที่ต้องยอมรับ: ผ่าน MF แล้ว module จะถูก render ฝั่ง client เท่านั้น (SSR ของ
> remote ไม่วิ่งเข้า shell) — pattern นี้คือ "SSR ที่ Next ของตัวเอง + island ที่ฝังใน shell"

---

## 2. ทำไมต้อง build MF ด้วย webpack แยก pass

ถ้าใส่ `ModuleFederationPlugin` ตรงใน `next.config.mjs` จะ build ผ่านก็จริง แต่
`remoteEntry.js` ที่ได้จะถูก push เข้า `webpackChunk_N_E` ของ Next
→ container ถูก execute ได้เฉพาะเมื่อมี **Next runtime chunk** อยู่ในหน้า
Vite host โหลด `remoteEntry.js` เป็น classic script เดี่ยว ๆ แล้ว `window.reportAnalytics`
ไม่ถูก define (หน้าที่ได้จะค้างที่ `Loading...`)

ทางแก้ใน POC นี้: build exposed entry ด้วย webpack ของตัวเอง (`mf/webpack.config.js`)
ซึ่งมี runtime ในตัว → `var reportAnalytics` ถูก define ทันทีที่ script ถูกโหลด
ผลลัพธ์ไปวางที่ `public/mf/` แล้ว Next เสิร์ฟเป็น static asset ธรรมดา

```
pnpm --filter @skyline/report-analytics build
  ├─ next build                     → SSR app (.next)
  └─ webpack --config mf/webpack.config.js
       └─ public/mf/{remoteEntry.js, <chunk>.js}
```

---

## 3. ฝั่ง shell ต้องประกาศอะไร

`apps/shell/vite.config.ts`

```ts
remotes: {
  reportAnalytics: {
    external: env.VITE_REPORT_ANALYTICS_REMOTE_URL
      ?? 'http://localhost:3002/mf/remoteEntry.js',
    format: 'var',      // webpack remote = classic script
    from: 'webpack',    // บอก plugin ว่า remote ไม่ใช่ vite
  },
}
```

`apps/shell/src/App.tsx` — `lazy(() => import('reportAnalytics/ReportAnalytics'))`
แล้ว map เข้า `<Route path="/analytics/*">` + มี `.catch()` fallback เหมือน remote อื่น

---

## 4. กับดักที่เจอจริงตอนทำ (และทางแก้)

| อาการ | สาเหตุ | ทางแก้ |
|---|---|---|
| หน้า `/analytics` ค้าง `Loading...` | `remoteEntry.js` ถูก push เข้า `webpackChunk_N_E` ต้องมี Next runtime ก่อน | build MF ด้วย webpack แยก pass (หัวข้อ 2) |
| ทั้ง tree พัง — `A React Element from an older version of React was rendered` | remote bundle React 18 (Next 14) แต่ shell ใช้ React 19 ซึ่งไม่รับ element symbol เก่า | อัป remote เป็น Next 15 + React 19 ให้ตรงกับ host |
| `Module Unavailable` | `shared: { react: { import: false } }` ให้ host จ่าย React ผ่าน share scope ข้าม bundler (webpack ↔ vite) → resolve ไม่ผ่าน | POC นี้ไม่ใช้ shared scope ให้ remote ถือ React 19 ของตัวเอง |
| hooks ใช้ไม่ได้ (`Invalid hook call`) | remote มี React copy ของตัวเอง → dispatcher ไม่ถูก init | exposed component เป็น **hooks-free** (คำนวณตอน module scope + callback ref) |
| CSS ของ remote ไม่ติดมาด้วย | shell ไม่โหลด CSS bundle ของ remote | ใช้ inline style ใน federated component |
| `404 /mf/<chunk>.js` หลัง build ใหม่ | `next start` cache รายชื่อไฟล์ใน `public/` ตอน start | restart `next start` ทุกครั้งหลัง build MF ใหม่ |

**สรุปข้อจำกัดของ pattern นี้**: ถ้าต้องการ hooks / context ร่วมกับ host ต้องทำ shared
React ให้ได้ก่อน (หรือย้ายไป `@module-federation/enhanced` / Module Federation 2.0
ที่รองรับ cross-bundler ดีกว่า) — POC นี้ตั้งใจหยุดที่ "component ธรรมดาแต่ทำงานได้จริง"

---

## 5. รันยังไง

```bash
# terminal 1 — remote
pnpm --filter @skyline/report-analytics build && pnpm --filter @skyline/report-analytics start

# terminal 2 — shell
pnpm --filter @skyline/shell dev      # หรือ build + preview
# เปิด http://localhost:5000/analytics (login mock: jdoe)
```

หรือรากเดียว: `pnpm build && pnpm preview`

ตรวจว่า federation ต่อได้:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3002/mf/remoteEntry.js   # 200
curl -s http://localhost:3002/ | grep "rendered on the Node server"                # SSR proof
```

---

## 6. Cross-app communication

`@skyline/shared` ถูก bundle แยกในแต่ละ app → `eventBus.subscribe()` ใน app หนึ่ง
ไม่ได้รับ event ที่ `publish()` จากอีก app ตรง ๆ
ช่องทางที่ใช้ข้าม bundle คือ **window CustomEvent** (`skyline:<event>`) ที่ `eventBus.publish`
dispatch ไว้อยู่แล้ว — `ReportAnalytics` จึง listen `window.addEventListener('skyline:defect:reported')`
และโชว์ตัวเลข "live defect events received" บนหน้า `/analytics`
