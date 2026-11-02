import ReportAnalytics from '../components/ReportAnalytics';
import { mockAircraft, mockDefects, mockWorkOrders } from '@skyline/shared';

// Proves the SSR path: this page is rendered on the Node server, not in the shell.
export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  const airworthy = mockAircraft.filter(
    (a) => a.airworthinessStatus === 'airworthy',
  ).length;
  const openDefects = mockDefects.filter((d) => d.status !== 'closed').length;
  const activeWo = mockWorkOrders.filter((w) => w.status !== 'completed').length;
  const renderedAt = new Date().toISOString();

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div
        style={{
          background: '#082f49',
          color: '#e0f2fe',
          padding: '12px 24px',
          fontSize: 13,
        }}
      >
        <strong>Next.js standalone (SSR)</strong> — this page was rendered on the
        Node server at {renderedAt} · process: {typeof window === 'undefined'
          ? 'server'
          : 'browser'}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          padding: '20px 24px 0',
          maxWidth: 900,
        }}
      >
        {[
          { k: 'Aircraft', v: mockAircraft.length },
          { k: 'Airworthy', v: airworthy },
          { k: 'Open defects', v: openDefects },
          { k: 'Active work orders', v: activeWo },
        ].map((s) => (
          <div
            key={s.k}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: '#6b7280',
                fontWeight: 700,
              }}
            >
              {s.k}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <ReportAnalytics context="standalone SSR page (client island hydrated)" />
    </main>
  );
}
