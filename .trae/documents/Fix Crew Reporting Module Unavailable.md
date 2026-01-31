## 1. Fix Shell Configuration
- Update [vite.config.ts](file:///Users/copter/Code/POCs/skyline-airway-microfrontend/apps/shell/vite.config.ts) to always point to the `/assets/remoteEntry.js` path for all remotes. This ensures consistency whether the shell is in dev or production mode, as we will serve remotes from their build output.

## 2. Update Development Workflow
- Modify the root [package.json](file:///Users/copter/Code/POCs/skyline-airway-microfrontend/package.json) to include a new `dev:all` script that:
  - Builds all remotes first.
  - Runs the remotes using `vite preview` (serving from `dist`).
  - Runs the shell in `vite` dev mode.
- This is the recommended way to develop with Vite Module Federation to ensure remote entries are always available.

## 3. Verify Module Resolution
- Ensure all Svelte components in `crew-reporting` are using the correct `@/` aliases for internal imports, as identified in the project's own fix-it documents.
- Verify that the `SvelteWrapper` in the shell is correctly receiving the `mount` function from the remote.

## 4. Verification
- Run the new `dev:all` command.
- Navigate to `http://localhost:5000/reporting` and verify the Crew Reporting Portal loads correctly.
- Check the browser console for any 404 errors related to `remoteEntry.js`.

Does this plan work for you? I'm ready to apply the configuration fixes.