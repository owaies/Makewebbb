# Responsive UI Smoke Tests

Check the main pages at desktop and mobile widths after changing layouts or navigation.

- The header and primary navigation remain usable at narrow widths.
- Every route renders its expected page and the not-found route offers a clear way home.
- Keyboard users can reach navigation links and form controls in a logical order.
- Visible focus states are not hidden by animated elements.
- Loading, error, and submission status messages remain readable.
- Theme changes preserve text contrast and do not depend on browser storage being available.
- Reduced-motion preferences avoid unnecessary page-transition movement and disable the animated custom cursor while leaving the native pointer available.

- Switch browser/device emulation from coarse/touch to fine/mouse pointer while the page remains open; confirm the custom cursor attaches and detaches as pointer capability changes.
- Toggle the operating-system reduced-motion preference while the page remains open; confirm cursor tracking stops when reduction is enabled and resumes only when it is disabled and a fine pointer is available.
- Press and hold the primary mouse button, then move the pointer outside the document or switch focus to another window; confirm the custom cursor does not remain in its pressed or hovered state when focus returns.

Capture viewport size and browser details when reporting a visual regression.
