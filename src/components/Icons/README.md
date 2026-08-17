# Icons Documentation

> **📖 Full Documentation:** See `/ICONS.md` in the project root for the complete consolidated guide.

This project uses Font Awesome icons with multiple usage patterns for maximum flexibility.

## 🎯 Three Ways to Use Icons

### 1. **Dynamic Icon Component** (Recommended for New Code)

The simplest way to use icons - just provide the icon name!

```tsx
import { Icon } from '@/components/Icons';

// Basic usage
<Icon name="dashboard" />

// With customization
<Icon name="settings" size="lg" color="var(--blue)" />

// With animation
<Icon name="loading" spin />

// TypeScript provides autocomplete for icon names!
<Icon name="???" /> // Press Ctrl+Space to see all available icons
```

**Pros:**
- ✅ Simplest to use
- ✅ TypeScript autocomplete for icon names
- ✅ No need to create wrapper components
- ✅ Centralized icon management

### 2. **Direct Font Awesome Icon** (For One-Off Icons)

Use any Font Awesome icon without adding it to the registry.

```tsx
import { Icon } from '@/components/Icons';
import { faRocket, faHeart } from '@fortawesome/free-solid-svg-icons';

<Icon icon={faRocket} />
<Icon icon={faHeart} color="red" spin />
```

**Pros:**
- ✅ Use any FA icon instantly
- ✅ No registration needed
- ✅ Great for prototyping

**Cons:**
- ⚠️ No name-based consistency
- ⚠️ Imports scattered across codebase

### 3. **Specific Icon Components** (Backward Compatibility)

The original approach - still supported!

```tsx
import { DashboardIcon, SettingsIcon } from '@/components/Icons';

<DashboardIcon />
<SettingsIcon size="lg" />
```

**Pros:**
- ✅ Explicit imports
- ✅ Tree-shaking friendly
- ✅ Works with existing code

**Cons:**
- ⚠️ Need to create wrapper for each icon
- ⚠️ More code to maintain

---

## 📦 Adding New Icons

### Method 1: Add to Registry (Recommended)

**Step 1:** Open `iconRegistry.ts`

**Step 2:** Import the icon from Font Awesome:
```tsx
import { faRocket } from '@fortawesome/free-solid-svg-icons';
```

**Step 3:** Add it to the `iconRegistry` object:
```tsx
export const iconRegistry = {
  // ... existing icons
  rocket: faRocket,  // Add this line
} as const;
```

**Step 4:** Use it anywhere!
```tsx
<Icon name="rocket" />
```

**That's it! No wrapper components needed!** 🎉

---

### Method 2: Use Directly (One-Off)

For icons you'll only use once:

```tsx
import { Icon } from '@/components/Icons';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

<Icon icon={faRocket} />
```

No registration needed!

---

### Method 3: Create Wrapper Component (Old Way)

If you prefer the explicit approach:

**Step 1:** Open `icons.tsx`

**Step 2:** Add import:
```tsx
import { faRocket } from '@fortawesome/free-solid-svg-icons';
```

**Step 3:** Create wrapper:
```tsx
export const RocketIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faRocket} {...props} />
);
```

---

## 🎨 Customization Examples

All methods support full Font Awesome customization:

### Size
```tsx
<Icon name="dashboard" size="xs" />   // Extra small
<Icon name="dashboard" size="sm" />   // Small
<Icon name="dashboard" size="lg" />   // Large
<Icon name="dashboard" size="2x" />   // 2x size
<Icon name="dashboard" size="10x" />  // 10x size
```

### Color
```tsx
<Icon name="heart" color="red" />
<Icon name="check" color="var(--green)" />
<Icon name="alert" style={{ color: '#ff0000' }} />
```

### Rotation & Flip
```tsx
<Icon name="arrow" rotation={90} />          // 90° rotation
<Icon name="arrow" rotation={180} />         // 180° rotation
<Icon name="arrow" flip="horizontal" />      // Flip horizontal
<Icon name="arrow" flip="vertical" />        // Flip vertical
```

### Animations
```tsx
<Icon name="loading" spin />           // Continuous spin
<Icon name="loading" pulse />          // 8-step spin
<Icon name="heart" beat />             // Scale animation
<Icon name="bell" shake />             // Shake animation
<Icon name="star" bounce />            // Bounce animation
<Icon name="text" fade />              // Fade animation
```

### Advanced
```tsx
<Icon name="dashboard" border />       // Add border
<Icon name="check" fixedWidth />       // Fixed width (for lists)
<Icon name="inverse" inverse />        // Invert colors
<Icon name="item" listItem />          // For list items
<Icon name="image" pull="left" />      // Float left
```

---

## 📚 Available Icons

Current icons in registry (with TypeScript autocomplete):

**Dashboard & Navigation:**
- `dashboard`, `users`, `fileText`, `mail`, `settings`

**Topbar:**
- `bell`, `search`, `sun`, `moon`, `menu`

**Actions:**
- `download`, `plus`, `userPlus`

**Status:**
- `checkCircle`, `clock`, `alertCircle`, `check`, `x`, `close`

**Trends:**
- `trendUp`, `trendDown`

**Utility:**
- `filter`, `sort`

**Chevrons:**
- `chevronLeft`, `chevronRight`, `chevronUp`, `chevronDown`
- `chevronDoubleLeft`, `chevronDoubleRight`, `anglesLeft`, `anglesRight`

**Communication:**
- `message`, `messageSquare`

**Other:**
- `login`, `eye`, `mapPin`, `location`, `list`, `stickyNote`, `note`, `moreHorizontal`, `ellipsis`

**To see all available icons in your IDE:**
Type `<Icon name="` and press Ctrl+Space for autocomplete! 🎯

---

## 🔍 Finding Icons

### Font Awesome Gallery
Browse all available icons: https://fontawesome.com/icons

**Free Solid Icons** (already included):
- 2,000+ icons
- Filled/solid style
- No cost

**Pro Icons** (requires license):
- 30,000+ icons
- Multiple styles (light, duotone, thin)
- Requires paid subscription

### Search Tips
1. Go to https://fontawesome.com/icons
2. Search for your icon (e.g., "rocket")
3. Click the icon
4. Copy the import name (e.g., `faRocket`)
5. Add to registry or use directly

---

## 🛠 Utility Functions

### Check if Icon Exists
```tsx
import { hasIcon } from '@/components/Icons';

if (hasIcon('rocket')) {
  return <Icon name="rocket" />;
}
```

### Get All Available Icons
```tsx
import { getAvailableIcons } from '@/components/Icons';

const icons = getAvailableIcons();
console.log(icons); // ['dashboard', 'settings', 'rocket', ...]
```

### Register Icon at Runtime
```tsx
import { registerIcon } from '@/components/Icons';
import { faCustomIcon } from './custom-icons';

registerIcon('myCustomIcon', faCustomIcon);

// Now use it
<Icon name="myCustomIcon" />
```

---

## 🎯 Best Practices

### ✅ DO

- Use `<Icon name="..." />` for consistency
- Add frequently-used icons to the registry
- Use descriptive icon names
- Leverage TypeScript autocomplete
- Use semantic icon names (e.g., `save` not `floppy`)

### ❌ DON'T

- Don't create wrapper components unless necessary
- Don't import icons in multiple files (use registry)
- Don't use obscure icon names (keep it simple)
- Don't register every icon (use direct method for one-offs)

---

## 📦 Migration Guide

### From Old Approach to New Approach

**Before:**
```tsx
import { DashboardIcon } from '../Icons/icons';

<DashboardIcon />
<DashboardIcon size="lg" />
```

**After:**
```tsx
import { Icon } from '@/components/Icons';

<Icon name="dashboard" />
<Icon name="dashboard" size="lg" />
```

**Both still work!** The old approach is maintained for backward compatibility.

---

## 🚀 Examples

### Example 1: Button with Icon
```tsx
import { Icon } from '@/components/Icons';

<button>
  <Icon name="plus" /> Add New
</button>
```

### Example 2: Dynamic Icon from Data
```tsx
import { Icon } from '@/components/Icons';
import type { IconName } from '@/components/Icons';

interface MenuItem {
  label: string;
  icon: IconName;
}

const menu: MenuItem[] = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Settings', icon: 'settings' },
];

{menu.map(item => (
  <a key={item.label}>
    <Icon name={item.icon} />
    {item.label}
  </a>
))}
```

### Example 3: Conditional Icons
```tsx
import { Icon } from '@/components/Icons';

<Icon name={isOpen ? 'chevronUp' : 'chevronDown'} />
<Icon name={isDarkMode ? 'moon' : 'sun'} />
<Icon name={status === 'loading' ? 'clock' : 'check'} spin={status === 'loading'} />
```

### Example 4: Icon Grid Showcase
```tsx
import { Icon, getAvailableIcons } from '@/components/Icons';

const icons = getAvailableIcons();

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
  {icons.map(name => (
    <div key={name} style={{ textAlign: 'center' }}>
      <Icon name={name} size="2x" />
      <div style={{ fontSize: '0.75rem' }}>{name}</div>
    </div>
  ))}
</div>
```

---

## 🔗 Resources

- **Font Awesome Gallery**: https://fontawesome.com/icons
- **React Font Awesome Docs**: https://fontawesome.com/docs/web/use-with/react
- **Icon Props Reference**: https://fontawesome.com/docs/web/use-with/react/style
- **Animation Guide**: https://fontawesome.com/docs/web/style/animate

---

## 💡 Pro Tips

1. **Use TypeScript Autocomplete**: Just type `<Icon name="` and press Ctrl+Space to see all available icons!

2. **Consistent Naming**: Use camelCase for icon names (e.g., `userPlus`, not `user-plus`)

3. **Aliases**: Create aliases for commonly used icons:
   ```ts
   export const iconRegistry = {
     save: faSave,
     saveAlt: faSave, // Alias
   };
   ```

4. **Icon Sets**: Group related icons:
   ```tsx
   // In iconRegistry.ts
   export const statusIcons = {
     success: faCircleCheck,
     error: faCircleExclamation,
     warning: faTriangleExclamation,
     info: faCircleInfo,
   };
   ```

5. **Performance**: Icons are tree-shaken automatically. Only imported icons are included in the bundle!

---

**Happy icon-ing! 🎨**
