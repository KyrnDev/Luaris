# Theme Types

This section contains the TypeScript types related to the theme and design tokens used across the Luaris Framework. These types define the various design tokens such as colours, sizes, border radius, and border widths that are used consistently across all components in the framework.

## Colour Types

The colour types include definitions for the different colour categories and their variations used in the design system. These types ensure that when specifying colours in component props, the values are valid and consistent with the design system.

### Type: `TColours`

`primary`, `secondary`, `accent`, `info`, `success`, `warning`, `danger`, `white`, `black`, `transparent`

### Type: `TColourTypes`

`base`, `on`, `hover`, `disabled`, `surface`, `active`

### Type: `TColourShades`

`lighter`, `light`, ` `, `dark`, `darker`

### Type: `TSurfaceColours`

`base`, `raised`, `sunken`, `overlay`, `border`, `inverse`

### Type: `TThemes`

`light`, `dark`

## Size Types

The size types include definitions for the various sizes used in the design system, such as spacing sizes, border radius sizes, and border width sizes. These types help ensure that when specifying sizes in component props, the values are valid and consistent with the design system.

### Type: `TSizes`

`2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Type: `TRadiusSize`

`none`, `sm`, `md`, `lg`, `pill`, `full`

### Type: `TBorderWidths`

`none`, `thin`, `thick`

## Font Types

The font types include definitions for the various font-related design tokens used in the design system, such as font families, font sizes, line heights, and font weights. These types help ensure that when specifying typography-related props in components, the values are valid and consistent with the design system.

### Type: `TFontFamily`

`primary`, `secondary`, `mono`

### Type: `TFontSizes`

`2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Type: `TFontLineHeights`

`tight`, `normal`, `relaxed`

### Type: `TFontWeights`

`light`, `regular`, `medium`, `semibold`, `bold`

## Motion Types

The motion types include definitions for the various motion-related design tokens used in the design system, such as motion durations and easings. These types help ensure that when specifying motion-related props in components, the values are valid and consistent with the design system.

### Type: `TMotionDurations`

`fast`, `normal`, `slow`

### Type: `TMotionEasings`

`standard`, `emphasised`
