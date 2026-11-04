# Makewebbb routing QA

Test every public route from a fresh browser session.

## Routes
- Home
- Services
- Work
- Team
- Contact

## Navigation
Verify direct URL loads, internal navigation, browser back/forward behavior, and the wildcard route.

## Animation
Confirm route transitions do not block the first interaction or leave the previous page visible after navigation.

## Reduced motion
- Enable `prefers-reduced-motion: reduce` before loading the site.
- Navigate between every public route and confirm content changes immediately without blur, slide, or exit choreography.
- Scroll through pages and confirm reveal and split-text content is visible without waiting for an in-view animation.
- Disable reduced motion and confirm the standard transitions still work.

## Themes
Repeat the navigation checks in both light and dark themes.
