import { ComponentType, lazy, LazyExoticComponent } from "react";

/**
 * Wraps React.lazy to automatically reload the page when a chunk loading error occurs
 * (typically happens when a new version of the app has been deployed and old chunks are missing).
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(async () => {
    const pageHasBeenForceRefreshed = window.sessionStorage.getItem(
      "page-has-been-force-refreshed"
    );

    try {
      const component = await componentImport();
      window.sessionStorage.removeItem("page-has-been-force-refreshed");
      return component;
    } catch (error: any) {
      if (!pageHasBeenForceRefreshed) {
        // Marks that we've refreshed once to avoid infinite reload loops
        window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
        window.location.reload();
        return { default: (() => null) as unknown as T };
      }

      // If already refreshed once, throw error so ErrorBoundary can display it
      throw error;
    }
  });
}
