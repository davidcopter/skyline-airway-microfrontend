# Skyline Airway Microfrontend: Project Analysis & Deployment Plan

## 1) Project analysis (current state)

### Architecture
- Monorepo managed with **pnpm workspaces**.
- One shell app (`apps/shell`) composes three remotes via **Vite Module Federation**:
  - `apps/fleet-health` (React)
  - `apps/defect-management` (Vue)
  - `apps/crew-reporting` (Svelte + PWA)
- Shared package: `packages/shared` (built with `tsup`).

### Runtime topology
- Shell routes traffic and lazy-loads remote modules.
- Remotes expose either a React app entry (`./App`) or a framework-specific mount API (`./mount`) consumed through wrappers in the shell.
- Existing local preview ports:
  - shell: 5000
  - fleet-health: 5001
  - defect-management: 5002
  - crew-reporting: 5003

### Build/deployment readiness findings
- ✅ Strong decoupling between domain modules (good for independent deployments).
- ✅ Graceful shell fallback UI if a remote fails to load.
- ⚠️ Shell remote URLs were hardcoded to localhost; this blocks promotion across environments.
- ⚠️ No explicit CI/CD or environment promotion workflow documented in-repo.
- ⚠️ No explicit version-compatibility contract between shell/remotes documented.

## 2) Changes implemented in this branch

To enable environment-specific deployments, shell federation remotes are now configured via environment variables:

- `VITE_FLEET_HEALTH_REMOTE_URL`
- `VITE_DEFECT_MANAGEMENT_REMOTE_URL`
- `VITE_CREW_REPORTING_REMOTE_URL`

Defaults still target localhost for local development.

Also added `apps/shell/.env.example` documenting expected variables.

## 3) Recommended deployment model

## 3.1 Hosting pattern
Deploy each microfrontend as independently versioned static assets (CDN/object storage or static web app hosting):
- `shell` on primary domain (e.g. `ops.skyline-airway.com`)
- each remote on dedicated subdomain/path (e.g. `mf-fleet...`, `mf-defects...`, `mf-reporting...`)

## 3.2 Environment strategy
Use at least three environments:
- **dev**: fast integration, frequent changes
- **staging**: pre-prod validation and release candidate verification
- **prod**: controlled releases

Set shell env variables per environment to point to corresponding remote `remoteEntry.js` URLs.

## 3.3 CI/CD pipeline blueprint
For each app (`shell`, `fleet-health`, `defect-management`, `crew-reporting`):
1. Install deps (`pnpm install --frozen-lockfile`)
2. Lint/type checks (where configured)
3. Build (`pnpm --filter <app> build`)
4. Publish static artifacts to environment-specific bucket/site
5. Invalidate CDN cache (or use immutable asset versioning)

For shell deploys:
- Inject remote URLs via environment variables during build.
- Publish shell only after targeted remote versions are already available.

## 3.4 Release sequencing
Recommended production release order:
1. Deploy remote(s) first.
2. Smoke-test each remote URL directly.
3. Deploy shell referencing new remote URLs.
4. Run post-deploy smoke tests on integrated routes:
   - `/fleet`
   - `/defects`
   - `/reporting`

## 3.5 Rollback strategy
- Roll back shell by re-pointing env vars to prior remote versions or previous remote endpoints.
- Roll back individual remotes independently without full-platform rollback.
- Keep at least one prior artifact version live and addressable in each environment.

## 3.6 Operational hardening checklist
- Add health/smoke probes for each remote entry URL.
- Add Sentry/logging per microfrontend with shared trace/correlation IDs.
- Pin shared dependency major versions across shell/remotes.
- Define compatibility contract:
  - exposed module names (`fleetHealth/App`, `defectManagement/mount`, `crewReporting/mount`)
  - mount API signatures for framework wrappers.
- Define cache strategy:
  - immutable hashed assets
  - controlled TTL for `remoteEntry.js` to balance freshness and stability.

## 4) Execution plan (30/60/90-day)

### Days 0-30
- Finalize environment-specific remote URL management (completed in this branch for shell).
- Stand up dev/staging/prod hosting targets and DNS.
- Add baseline CI jobs for all apps.

### Days 31-60
- Add integration smoke tests for shell routes and remote availability.
- Introduce release checklist and rollback runbook.
- Add observability (error tracking + basic metrics).

### Days 61-90
- Add contract testing between shell and remotes.
- Enable progressive delivery (canary shell rollout).
- Add SLOs and alerting thresholds for remote load failures.

## 5) Immediate next actions
1. Create `.env` files per environment for shell using `.env.example`.
2. Configure hosting/CDN endpoints and map them to `VITE_*_REMOTE_URL` variables.
3. Add CI pipelines for per-app build + deploy.
4. Execute first staging rollout using remote-first sequencing.
