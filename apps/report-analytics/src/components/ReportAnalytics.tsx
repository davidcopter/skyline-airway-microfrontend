'use client';

import React from 'react';
import {
  mockAircraft,
  mockDefects,
  mockWorkOrders,
  eventBus,
  EVENTS,
} from '@skyline/shared';

type Props = {
  /** Where this component is being rendered — used to label the POC proof banner. */
  context?: string;
};

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
};

const kpiValue: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: '#0f172a',
  lineHeight: 1.1,
};

const label: React.CSSProperties = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 0.6,
  color: '#6b7280',
  fontWeight: 700,
};

// Static mock data -> compute once, no hooks needed (see note below).
const stats = (() => {
  const airworthy = mockAircraft.filter(
    (a) => a.airworthinessStatus === 'airworthy',
  ).length;
  const open = mockDefects.filter((d) => d.status !== 'closed');
  const bySeverity = ['aog', 'mel', 'deferred'].map((sev) => ({
    sev,
    count: open.filter((d) => d.severity === sev).length,
  }));
  const activeWo = mockWorkOrders.filter((w) => w.status !== 'completed');
  const avgProgress = activeWo.length
    ? Math.round(activeWo.reduce((sum, w) => sum + w.progress, 0) / activeWo.length)
    : 0;

  return {
    fleet: mockAircraft.length,
    airworthy,
    openDefects: open.length,
    bySeverity,
    activeWo: activeWo.length,
    avgProgress,
  };
})();

/**
 * Live counter for `defect:reported` events published by other microfrontends.
 *
 * Listens on `window` (the `skyline:*` CustomEvent bridge) rather than on the in-process
 * eventBus: each microfrontend bundles its own copy of `@skyline/shared`, so a publish()
 * in crew-reporting reaches this app only through the window bridge.
 *
 * Deliberately hooks-free: this bundle ships its own React copy (webpack) while the shell
 * reconciles with React 19 (Vite); hooks would call the wrong dispatcher. See
 * REPORT_ANALYTICS_POC.md.
 */
function LiveEventCounter() {
  let counter = 0;
  let currentEl: HTMLElement | null = null;
  let unsubscribe: (() => void) | null = null;

  const bump = () => {
    counter += 1;
    if (currentEl) currentEl.textContent = String(counter);
  };

  const attach = (el: HTMLElement | null) => {
    if (!el) {
      // React called the ref with null -> unmount.
      if (unsubscribe) unsubscribe();
      window.removeEventListener('skyline:defect:reported', bump);
      unsubscribe = null;
      currentEl = null;
      return;
    }
    currentEl = el;
    el.textContent = '0';
    // In-process bus (same bundle) + the cross-bundle window bridge.
    unsubscribe = eventBus.subscribe(EVENTS.DEFECT_REPORTED, bump);
    window.addEventListener('skyline:defect:reported', bump);
  };

  return (
    <strong
      ref={attach}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      data-testid="live-events"
    >
      0
    </strong>
  );
}

/**
 * Federated into the Vite shell via Module Federation (`./ReportAnalytics`).
 * Styling is inline on purpose: the shell never loads this app's CSS bundle.
 */
export default function ReportAnalytics({
  context = 'federated in shell',
}: Props) {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 4,
          flexWrap: 'wrap',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#0f172a' }}>
          Report Analytics
        </h1>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 999,
            background: '#dcfce7',
            color: '#166534',
          }}
        >
          Next.js 15 · React 19 · Module Federation (webpack → vite)
        </span>
      </div>
      <p style={{ margin: '0 0 20px', color: '#6b7280', fontSize: 13 }}>
        Rendered as a federated client component · {context} · live defect events
        received: <LiveEventCounter />
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={card}>
          <div style={label}>Fleet</div>
          <div style={kpiValue}>{stats.fleet}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            {stats.airworthy} airworthy
          </div>
        </div>
        <div style={card}>
          <div style={label}>Open defects</div>
          <div style={kpiValue}>{stats.openDefects}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            {stats.bySeverity.map((s) => `${s.sev}:${s.count}`).join(' · ')}
          </div>
        </div>
        <div style={card}>
          <div style={label}>Active work orders</div>
          <div style={kpiValue}>{stats.activeWo}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            avg progress {stats.avgProgress}%
          </div>
        </div>
        <div style={card}>
          <div style={label}>Compliance</div>
          <div style={kpiValue}>
            {Math.round((stats.airworthy / stats.fleet) * 100)}%
          </div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>airworthiness rate</div>
        </div>
      </div>

      <div style={card}>
        <div style={{ ...label, marginBottom: 10 }}>Defect breakdown</div>
        {stats.bySeverity.map((s) => {
          const pct = stats.openDefects
            ? Math.round((s.count / stats.openDefects) * 100)
            : 0;
          const color =
            s.sev === 'aog' ? '#dc2626' : s.sev === 'mel' ? '#f59e0b' : '#0ea5e9';
          return (
            <div key={s.sev} style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  color: '#374151',
                  marginBottom: 4,
                }}
              >
                <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  {s.sev}
                </span>
                <span>
                  {s.count} ({pct}%)
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: '#f1f5f9',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: color,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
