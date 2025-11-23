'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useSettings } from './useSettings';
import type { Mode } from '@/contexts/settingsContext';

export function useThemeTransition() {
  const { setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  const toggleTheme = useCallback(async () => {
    const newMode: Mode = settings.mode === 'dark' ? 'light' : 'dark';

    if ('startViewTransition' in document) {
      // @ts-ignore - View Transitions API
      const transition = document.startViewTransition(async () => {
        const updatedSettings = {
          ...settings,
          mode: newMode,
          theme: {
            ...settings.theme,
            styles: {
              light: settings.theme.styles?.light || {},
              dark: settings.theme.styles?.dark || {}
            }
          }
        };
        updateSettings(updatedSettings);
        setTheme(newMode);
      });

      try {
        await transition.finished;
      } catch (error) {
        console.error('Theme transition failed:', error);
      }
    } else {
      // Fallback for browsers that don't support view transitions
      const updatedSettings = {
        ...settings,
        mode: newMode,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {}
          }
        }
      };
      updateSettings(updatedSettings);
      setTheme(newMode);
    }
  }, [settings, setTheme, updateSettings]);

  return {
    toggleTheme,
    currentTheme: settings.mode,
  };
}