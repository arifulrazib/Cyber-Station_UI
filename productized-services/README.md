# "Productized services" section redesign

Interactive HTML mockup (no build step). Open `index.html` in a browser.
**Content rule:** only what visitors see in the live `#programmes` section. Nothing added or removed.

## Screenshots

![Desktop](screenshots/1-desktop.png)

| Tablet | Phone |
|---|---|
| ![Tablet](screenshots/3-tablet.png) | ![Phone](screenshots/4-mobile.png) |

## What changed (layout and styling only)

1. **Recommended programme is a full-width card.** Managed SOC Launch spans the row: text, tiles and button on the left, the sample view on the right. The four other programmes are no longer squeezed into a 2×2 block beside it.
2. **The four programmes share one card structure:** pill, title, description, tags.
3. **Colour per programme.** The live `data-home-card-tone` 0–3 values each get one colour (top bar and pill).
4. **Readable tags.** The live source text is already sentence case, so the CSS no longer forces uppercase, and tags are 13px chips instead of tiny monospace.
6. **The 4w timeline and "9 controls" are given more weight** in the sample view.
7. **Enterprise Shield's "Talk to sales" is a filled button**, since it's the section's only visible action.
8. **Phone layout:**
   - The four programmes become a swipeable row with the next card peeking in, plus dot navigation.
   - Section height drops from about 2,000px to about 1,700px.
   - Feature tiles stack in one column below 430px.
9. **Accessibility:**
   - The "Talk to sales" button's screen-reader name includes the package ("Talk to sales: Enterprise Shield").
   - The decorative chart is hidden from screen readers (`aria-hidden`).
   - Dots are labelled buttons.
   - Focus outlines are visible.
   - Motion is switched off for visitors who ask for reduced motion.
10. **"Talk to sales" keeps its live handler** `startCall('enterprise')`. In the mockup it shows a message naming the handler.

## Open points (content decisions, not changed here)

- The heading and subtitle read like an internal design brief, not copy for buyers.
- "9 controls" conflicts with the "What we do" section, which lists MDR with 1 control.
- Three programme cards have no action at all. The page code contains "Open SOC calculator" and "View scope" buttons, but the live site hides them with `data-pricing-hidden`. They're left out here.
- The Entry → Foundation → Audit-ready → Full stack labels suggest a sequence. Confirm whether to show it as steps.
