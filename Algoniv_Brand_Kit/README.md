# Algoniv Brand Kit

Version 1.2  
Master source: Canva vector PDF supplied by Algoniv

## Brand idea

Algoniv combines algorithmic intelligence with clear, actionable insight. The identity pairs a precise lowercase wordmark with three rising signal bars. The diagonal knockout across `algo` suggests pattern recognition, motion, and a line of insight cutting through complexity.

## Primary logo

Use the full-color horizontal logo whenever space and contrast allow.

- Wordmark: black
- Insight bars: Algoniv Signal Red
- Diagonal line: a true knockout/transparent gap, not an added gray or white stroke
- Typeface geometry: Quicksand Medium, converted to vector outlines in the supplied master files
- Do not retype the logo in an application font

Preferred files:

- `01_Master_Logos/algoniv-logo-full-color.svg` for websites, applications, print workflows, and scalable use
- `01_Master_Logos/algoniv-logo-full-color-2048.png` when SVG is not supported
- `01_Master_Logos/algoniv-logo-reversed.svg` on dark or photographic backgrounds

## Insight icon

The three-bar mark is the compact Algoniv identifier. It may be used independently for:

- Favicons and browser tabs
- App icons
- Social avatars
- UI avatars and loading states
- Small merchandise or device markings

The center bar contains a circular knockout near its base. Preserve this detail at 24 px and above. At 16 px, use the supplied optimized favicon rather than recreating the icon.

## Color system

| Role             | Name               |       HEX |           RGB | Usage                                   |
| ---------------- | ------------------ | --------: | ------------: | --------------------------------------- |
| Primary accent   | Algoniv Signal Red | `#E80808` |     232, 8, 8 | Insight bars, key actions, highlights   |
| Primary ink      | Algoniv Black      | `#000000` |       0, 0, 0 | Wordmark, headlines, high-contrast text |
| Reverse          | White              | `#FFFFFF` | 255, 255, 255 | Reversed logo and light surfaces        |
| Supporting dark  | Charcoal           | `#151515` |    21, 21, 21 | Dark backgrounds and interfaces         |
| Supporting light | Soft Gray          | `#F4F5F7` | 244, 245, 247 | Quiet surfaces and dividers             |
| Supporting text  | Slate              | `#475467` |   71, 84, 103 | Body copy and secondary information     |

Signal Red is taken directly from the vector PDF. Do not substitute a brighter red in the logo artwork.

## Typography

### Display and headings

Use **Quicksand** for expressive headings, key numbers, and short labels.

- Medium: primary heading weight
- SemiBold: emphasis and small labels
- Regular: secondary headings

### Body and interface copy

Use **Inter**, or the platform system sans-serif when Inter is unavailable.

- Regular: body copy
- Medium: controls and labels
- SemiBold: important UI actions

Never recreate the wordmark by typing `algoniv`; use the outlined master logo.

## Geometry

The geometry below is recorded from the 375 × 375 pt Canva PDF master.

- Master canvas: 375 × 375 pt
- Wordmark baseline: approximately 226.58 pt
- Logo artwork bounds: approximately x 92.24–281.00 pt, y 159.49–237.58 pt
- Diagonal knockout angle: approximately 11° rising from left to right
- Diagonal knockout: a tapered triangular cut, not a constant-width stripe
- The cut begins at an apex near the `a`, increases continuously through `l` and `g`, and reaches approximately 3.75 pt at the final intersection on `o`
- Left bar: approximately 6.97 × 25.04 pt
- Center bar: approximately 6.84 × 35.51 pt
- Right bar: approximately 6.83 × 16.74 pt
- Bar corner radius: approximately one-half the bar width
- Center-bar circular knockout: approximately 5.16 × 5.52 pt, centred at approximately x 246.28 pt / y 191.19 pt
- Lowercase `i`: no independent dot. The original dot is removed with an approximately 7.05 × 7.55 pt outer knockout; the red center insight bar then provides the smaller circular aperture.

### Clear space

Define `x` as the width of the center insight bar. Keep at least **2x** clear space on every side of the full logo and **1.5x** around the standalone insight icon.

### Minimum size

- Full horizontal logo: 140 px wide digitally or 30 mm wide in print
- Insight icon: 24 px preferred minimum
- Favicon: use the supplied 16 px and 32 px exports

## Background use

- White or very light background: full-color primary logo
- Black, charcoal, or dark image: reversed white wordmark with red bars
- Single-color production: monochrome black or monochrome white masters
- Busy photography: place the logo in a clear quiet zone; do not add shadows, outlines, or glow

## Misuse

Do not:

- Change the bar proportions or their relative heights
- Remove the center-bar circular knockout
- Add a separate dot above the lowercase `i`
- Replace the progressive tapered diagonal with a constant-width cut
- Redraw or straighten the diagonal knockout
- Stretch, compress, rotate, or skew the logo
- Change the red independently from `#E80808`
- Apply gradients, bevels, shadows, or outlines
- Change letter spacing or substitute another font
- Place the black wordmark on a dark background
- Place the white wordmark on a light background
- Use the insight icon as a decorative pattern without sufficient spacing

## File map

```text
01_Master_Logos/     Full-color, reversed, and monochrome SVG/PNG masters
02_Insight_Icon/     Standalone three-bar vector and raster marks
03_Favicons/         Browser favicon PNG sizes and favicon.ico
04_App_Icons/        Mobile, PWA, and touch-icon sizes
05_Social/           Square avatar and horizontal cover assets
06_Brand_Guidelines/ This guide plus CSS and JSON design tokens
```

## Developer tokens

Use `algoniv-brand-tokens.css` for CSS variables or `algoniv-brand-tokens.json` for application and design-system integrations.
