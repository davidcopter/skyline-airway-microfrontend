# Fix Crew Reporting Module Resolution Errors

I will resolve the `Cannot find module '../../lib/utils'` error in the `crew-reporting` subsystem by setting up proper path aliases and updating the component imports.

## Proposed Changes

### 1. Update TypeScript Configuration
- Modify [tsconfig.json](file:///Users/copter/Code/nnt-toms/POCs/skyline-airway-microfrontend/apps/crew-reporting/tsconfig.json) in `apps/crew-reporting` to include a path mapping for `@/*` pointing to `src/*`. This will provide better module resolution for the IDE and compiler.

### 2. Update Vite Configuration
- Update [vite.config.ts](file:///Users/copter/Code/nnt-toms/POCs/skyline-airway-microfrontend/apps/crew-reporting/vite.config.ts) in `apps/crew-reporting` to include the `@` alias. This ensures that the build tool can resolve the new import style.

### 3. Refactor Component Imports
- Update all Svelte components in [apps/crew-reporting/src/components/ui](file:///Users/copter/Code/nnt-toms/POCs/skyline-airway-microfrontend/apps/crew-reporting/src/components/ui) to use the centralized `@/lib/utils` import instead of incorrect relative paths like `../../lib/utils`.

## Success Criteria
- The TypeScript error `ts(2307)` ("Cannot find module") is resolved in all UI components.
- The `crew-reporting` application builds successfully without module resolution errors.
