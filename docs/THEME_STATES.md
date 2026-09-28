# Makewebbb Theme States

The theme context supports dark and light states.

## Runtime behavior

Theme selection is restored from browser storage when available. The provider synchronizes the document color-scheme and the root dark/light classes on each change. Storage failures are tolerated so the UI can still render with the selected in-memory theme.

## Review checklist

When changing theme behavior, check initial load, manual toggling, refresh persistence, unavailable storage, browser form controls, and page-transition rendering. Keep visual state in the shared provider rather than duplicating theme logic in individual pages.
