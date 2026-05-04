# Units Types

The units types include definitions for the various units of measurement used in the framework, such as lengths, sizes, and other CSS-related values. These types help ensure that when specifying dimensions or spacing in component props, the values are valid and consistent with the design system.

> [!WARNING]
> These are mostly template literal types, or may inherit from other TypeScript built-in types, so rather than listing all possible values, it's best to refer to the TypeScript documentation for template literal types and built-in types for a complete reference of possible values.

## Layout Types

The layout types include definitions for the various units, elements, and more.

### Type: `TLayoutsNode`

```typescript
keyof HTMLElementTagNameMap
	| keyof SVGElementTagNameMap
	| keyof MathMLElementTagNameMap
```

The layout lengths type includes definitions for the various length values that can be used in the design system, such as `calc()`, `var()`, global values, numeric values, and specific CSS units. This type helps ensure that when specifying length-related props in components, the values are valid and consistent with the design system.

### Type: `TLayoutsLength`

```typescript
TLayoutsNumeric
	| `${number}${TLayoutsUnits}`
	| 'auto'
```

### Type: `TLayoutsUnits`

```typescript
cap | ch | em | ex | ic | lh | vh | vw | vmax | vmin | vb | vi | cqw | cqh
	| cqi | cqb | cqmin | cqmax | px | cm | mm | Q | in | pc | pt
```

### Type: `TLayoutsNumeric`

```typescript
TLayoutsBase | TLayoutsZero
```

### Type: `TLayoutsBase`

```typescript
TLayoutsCalc | TLayoutsVar | TLayoutsGlobal
```

### Type: `TLayoutsCalc`

```typescript
calc(${string})
```

### Type: `TLayoutsVar`

```typescript
var(--${string})
```

### Type: `TLayoutsZero`

```typescript
0 | '0'
```

### Type: `TLayoutsGlobal`

```typescript
'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'
```

### Type: `TLayoutsColour`

```typescript
TLayoutsVar | TLayoutsGlobal | string
```

### Type: `TLayoutsLengthPercentage`

```typescript
TLayoutsNumeric | `${number}${TLayoutsUnits}` | `${number}%`
```

### Type: `TLayoutsNumber`

```typescript
TLayoutsNumeric | number | `${number}`
```

### Type: `TLayoutsPercentage`

```typescript
TLayoutsNumeric | `${number}%`
```
