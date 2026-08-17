/**
 * Global type declarations for the CSM Dashboard
 */

// CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// CSS files
declare module '*.css' {
  const css: string;
  export default css;
}

// JSON files
declare module '*.json' {
  const value: any;
  export default value;
}

// Image files
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}
