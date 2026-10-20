# Responsive UI Smoke Tests

Check the main pages at desktop and mobile widths after changing layouts or navigation.

- The header and primary navigation remain usable at narrow widths.
- Every route renders its expected page and the not-found route offers a clear way home.
- Keyboard users can reach navigation links and form controls in a logical order.
- Visible focus states are not hidden by animated elements.
- Loading, error, and submission status messages remain readable.
- Theme changes preserve text contrast and do not depend on browser storage being available.
- Reduced-motion preferences avoid unnecessary page-transition movement.

Capture viewport size and browser details when reporting a visual regression.
