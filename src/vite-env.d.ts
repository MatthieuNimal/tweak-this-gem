/// <reference types="vite/client" />

// Global type declarations for path aliases
declare module '@/components/ui/*';
declare module '@/components/*';
declare module '@/lib/*';
declare module '@/hooks/*';
declare module '@/pages/*';

// Export specific modules with all members
declare module '@/lib/mock-data' {
  export type Match = any;
  export const mockMatches: any[];
}

declare module '@/lib/store' {
  export type BetType = any;
  export const useUserStore: any;
  export const useBetStore: any;
  export const useUserBetsStore: any;
  export const useMatchStatusStore: any;
}

declare module '@/components/ui/button' {
  export type ButtonProps = any;
  export const Button: any;
  export const buttonVariants: any;
}

declare module '@/components/ui/toast' {
  export type ToastProps = any;
  export type ToastActionElement = any;
  export const Toast: any;
  export const ToastClose: any;
  export const ToastDescription: any;
  export const ToastProvider: any;
  export const ToastTitle: any;
  export const ToastViewport: any;
}
