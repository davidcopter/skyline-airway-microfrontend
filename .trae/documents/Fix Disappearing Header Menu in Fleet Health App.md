## 1. Standardize Shell Layout
- Update the Shell's [App.tsx](file:///Users/copter/Code/POCs/skyline-airway-microfrontend/apps/shell/src/App.tsx) to ensure the `<main>` container is a proper flex child that constrains its remote content.
- Change `<main className="flex-1 relative">` to `<main className="flex-1 flex flex-col min-h-0 relative">`. The `min-h-0` is crucial for flex children with `overflow-auto` to work correctly.

## 2. Fix Header Z-Index and Positioning
- Ensure the Shell's [Header.tsx](file:///Users/copter/Code/POCs/skyline-airway-microfrontend/apps/shell/src/components/Header.tsx) has a sufficiently high `z-index` and that its `sticky` behavior isn't broken by parent overflow settings.

## 3. Adjust Remote Sub-Navigation
- Update the Fleet Health [App.tsx](file:///Users/copter/Code/POCs/skyline-airway-microfrontend/apps/fleet-health/src/App.tsx) to ensure its sub-navigation bar (the white bar) doesn't have conflicting positioning that might overlap the Shell's header.

## 4. Verification
- Navigate to the Fleet Health module via the header menu.
- Verify the blue Shell header remains visible at the top.
- Verify the white sub-navigation bar of the Fleet Health module appears correctly below the blue Shell header.
- Test responsiveness (mobile menu) to ensure the hamburger menu also works correctly within the microfrontend view.

Does this plan address the issue you're seeing? I'll proceed with the CSS and layout adjustments once confirmed.