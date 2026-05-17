# Components

The Luaris framework includes a growing library of reusable UI components built with Vue 3 and TypeScript. These components are designed to work seamlessly with the design system and provide a consistent user experience across applications.

> [!WARNING]
> Unfortunately, Vitepress adds a lot of overhead styles to the page which can interfere with the appearance of the components, so if you notice classes being added to elements, this may be purely for documentation purposes and avoiding conflicting styles.

[[toc]]

## Legend

- ❌ = Not started
- 🚧 = In progress
- ✅ = Completed

## Component List

The below table describes the current status of each planned component in the library, with links to their documentation pages where available. This list is not exhaustive and will continue to grow as new components are added.

| Status | Component | Description |
| --- | --- | --- |
| ✅ | [Accordion](./accordion/index.md) | A component for displaying collapsible content sections, allowing users to expand and collapse information as needed. |
| ✅ | [Alert](./alert/index.md) | A component for displaying important messages or notifications to users, with support for different types (success, error, warning, info) and optional dismiss functionality. |
| ❌ | [App](./app/index.md) | The root layout component for the application, providing a consistent structure and context for all pages and components, including built-in support for accessibility features, toasts, and global state management. |
| ✅ | [Avatar](./avatar/index.md) | A component for displaying circular user profile images with initials and icon fallbacks. |
| ✅ | [Badge](./badge/index.md) | A small badge component for displaying counts, statuses, or labels. |
| ❌ | [Breadcrumbs](./breadcrumbs/index.md) | A navigation component that displays the user's current location within the app's hierarchy and allows them to easily navigate back to previous levels. |
| ✅ | [Button](./button/index.md) | A versatile and customizable button component for various actions in your application. |
| ❌ | [Calendar](./calendar/index.md) | An interactive calendar component that supports multiple views (month, year, decade) and range selection, with optional support for calendar events. |
| ✅ | [Card](./card/index.md) | A card component for displaying content in a structured and visually appealing way. |
| ❌ | [Carousel](./carousel/index.md) | A component for displaying a series of content items, such as images or cards, in a horizontal scrollable format with navigation controls. |
| ❌ | [Checkbox](./checkbox/index.md) | A component for selecting one or more options from a set, with support for indeterminate state and custom styling. |
| ❌ | [Color Picker](./colour-picker/index.md) | A component that allows users to select a colour from a palette or input a custom colour value, with support for different formats (hex, rgba, hsl). |
| ❌ | [Combobox](./combobox/index.md) | A component that combines a dropdown list with an input field, allowing users to select from predefined options or enter their own value, with support for autocomplete and keyboard navigation. |
| ❌ | [Command Palette](./command-palette/index.md) | A floating command palette that can be triggered with a hotkey, supports fuzzy search, and provides an interface for executing commands or navigating the app. |
| ❌ | [Context Menu](./context-menu/index.md) | A right-click context menu that can be attached to any element, supports nested submenus, and is fully keyboard accessible. |
| ❌ | [Data Table](./data-table/index.md) | A component for displaying tabular data with support for sorting, filtering, pagination, and customizable columns. |
| ❌ | [Date Picker](./date-picker/index.md) | A component that allows users to select a date from a calendar interface, with support for different date formats and optional time selection. |
| ❌ | [Date Range Picker](./date-range-picker/index.md) | An extension of the date picker that allows users to select a range of dates, with support for predefined ranges (e.g. last 7 days, this month) and custom range selection. |
| ✅ | [Details](./details/index.md) | A component for displaying additional information in a collapsible section, similar to the HTML `<details>` element, with support for custom styling and content. |
| ❌ | [Dialog](./dialog/index.md) | A modal dialog component that can be used for confirmations, forms, or any content that needs to be displayed in a layer above the main app content, including modal support. |
| ❌ | [Divider](./divider/index.md) | A simple component for visually separating content sections with a horizontal line. |
| ❌ | [Drawer](./drawer/index.md) | A sliding panel component that can be used for navigation, filters, or additional content, with support for different placements (left, right, top, bottom) and responsive behavior. |
| ❌ | [Dynamic Island](./dynamic-island/index.md) | An experimental component to mimic the iPhone's dynamic island floating container, which can be used for toasts or transient notifications that appear above the main app content. |
| ❌ | [File Input](./file-input/index.md) | A component for uploading files, with support for drag-and-drop, multiple file selection, and customizable styling. |
| ✅ | [Flex](./flex/index.md) | A flexible container component for creating responsive layouts. |
| ❌ | [Form](./form/index.md) | A component for building forms with built-in validation, error handling, and support for various input types. |
| ❌ | [Form Field](./form-field/index.md) | A component for wrapping individual form controls, providing consistent styling, labels, and error messages. |
| ❌ | [Grid](./grid/index.md) | A component for creating grid-based layouts, with support for responsive columns, gaps, and alignment. |
| ❌ | [Hover Card](./hover-card/index.md) | A card that appears when hovering over an element, used for previews or additional info, supports rich content and is fully keyboard accessible. |
| ✅ | [Icon](./icon/index.md) | A component for displaying icons from the Font Awesome library (incl. pro). |
| ❌ | [Icon Picker](./icon-picker/index.md) | A component that allows users to select an icon from the Font Awesome library, with support for search and categorization. |
| ❌ | [Image](./image/index.md) | A component for displaying images with support for lazy loading, placeholders, and error handling. |
| ❌ | [Input](./input/index.md) | A component for text input, with support for different types (text, password, email), validation, and customizable styling. |
| ❌ | [Label](./label/index.md) | A component for displaying labels or tags, with support for different sizes, colors, and optional icons. |
| ❌ | [List](./list/index.md) | A component for displaying lists of items, with support for different list types (ordered, unordered), nested lists, and customizable styling. |
| ❌ | [Markdown](./markdown/index.md) | A component that can render markdown content, with support for GitHub-flavored markdown features like tables, task lists, and syntax-highlighted code blocks, and built-in editor. |
| ❌ | [Menu](./menu/index.md) | A component for displaying a menu of options, with support for nested submenus, icons, and keyboard navigation. |
| ❌ | [Media](./media/index.md) | A component for displaying media content such as videos or audio players, with support for different sources and customizable controls. |
| ❌ | [Mentions Input](./mentions-input/index.md) | An expansion of the Combobox, an input that provides autocomplete suggestions for user mentions, supports @-style mentions and is fully keyboard accessible. |
| ❌ | [Navigation](./navigation/index.md) | A component for building navigation bars or menus, with support for different layouts (horizontal, vertical), dropdowns, and responsive behavior. |
| ❌ | [Number Input](./number-input/index.md) | A component for numeric input, with support for increment/decrement buttons, validation, and customizable styling. |
| ✅ | [Page](./page/index.md) | Flexible page component for building structured layouts with header, content, and footer sections and more. |
| ❌ | [Pagination](./pagination/index.md) | A component for displaying pagination controls, with support for different styles (simple, numbered), and customizable behavior. |
| ❌ | [Popover](./popover/index.md) | A component for displaying a popover layer of content when an element is clicked or hovered, with support for different placements and customizable content. |
| ❌ | [Progress](./progress/index.md) | A component for displaying progress bars or spinners, with support for different styles (linear, circular), and customizable colors and sizes. |
| ❌ | [Radio](./radio/index.md) | A component for selecting one option from a set, with support for custom styling and keyboard navigation. |
| ❌ | [Rating](./rating/index.md) | A component for displaying and selecting ratings, with support for different styles (stars, hearts), and customizable sizes and colors. |
| ❌ | [Segmented Input](./segmented-input/index.md) | A component that renders multiple input fields based on a provided format, such as XX-XX-XX or XXX-XXX, allowing for structured input like credit card numbers or phone numbers. |
| ❌ | [Select](./select/index.md) | A component for selecting one or more options from a dropdown list, with support for search, multiple selection, and customizable styling. |
| ❌ | [Skeleton](./skeleton/index.md) | A component for displaying placeholder content while data is loading, with support for different shapes (text, circle, rectangle) and customizable animation. |
| ❌ | [Slider](./slider/index.md) | A component for selecting a value from a range, with support for single or multiple handles, and customizable styling. |
| ❌ | [Sortable](./sortable/index.md) | A component for creating sortable lists or grids, with support for drag-and-drop functionality and customizable behavior. |
| ❌ | [Stat](./stat/index.md) | A component for displaying key statistics or metrics, with support for different styles (number, percentage), and customizable colors and sizes. |
| ❌ | [Stepper](./stepper/index.md) | A component for displaying a sequence of steps in a process, with support for different styles (horizontal, vertical), and customizable behavior. |
| ✅ | [Switch](./switch/index.md) | A switch component for toggling between two states, such as on/off or enabled/disabled. |
| ❌ | [Table](./table/index.md) | A component for displaying tabular data with support for sorting, filtering, pagination, and customizable columns. |
| ❌ | [Tabs](./tabs/index.md) | A component for displaying tabbed content, allowing users to switch between different views or sections within the same page. |
| ✅ | [Tag](./tag/index.md) | A tag component for displaying labels, categories, or keywords. |
| ❌ | [Textarea](./textarea/index.md) | A component for multi-line text input, with support for validation, auto-resizing, and customizable styling. |
| ❌ | [Time Picker](./time-picker/index.md) | A component that allows users to select a time from a clock interface, with support for different time formats and optional date selection. |
| ❌ | [Time Range Picker](./time-range-picker/index.md) | An extension of the time picker that allows users to select a range of time, with support for predefined ranges (e.g. last hour, this afternoon) and custom range selection. |
| ❌ | [Timeline](./timeline/index.md) | A component for displaying a chronological sequence of events or activities, with support for different styles (vertical, horizontal), and customizable content. |
| ❌ | [Toast](./toast/index.md) | A component for displaying transient notifications or messages to users, with support for different types (success, error, warning, info) and customizable behavior. |
| ❌ | [Tooltip](./tooltip/index.md) | A component for displaying a small tooltip of information when hovering over an element, with support for different placements and customizable content. |
| ❌ | [Tree](./tree/index.md) | A component for displaying hierarchical data in a tree structure, with support for expanding/collapsing nodes, and customizable styling. |
| ❌ | [Virtual List](./virtual-list/index.md) | A component for efficiently rendering large lists of data by only rendering the visible items, with support for variable item heights and customizable behavior. |
