import { createTheme } from '@mui/material';
import themeSettingsJSON from './theme.json';
import { capitalize } from '@mui/material';

function importThemeSettings(themeSettings) {
  const palette = importPalette(themeSettings);
  const styles = importStyles(themeSettings);
  const theme = {
    palette: palette,
    typography: styles
  }
  return theme
}

function importPalette(themeSettings) {
  const paletteColorKeys = Object.keys(themeSettings.palettes);
  const palette = {};

  paletteColorKeys.forEach(k => {
    palette[k] = {...themeSettings.palettes[k]};
    palette[k]['main'] = themeSettings.coreColors[k] || themeSettings.palettes[k][50];

    const lightKeys = Object.keys(themeSettings.schemes.light);
    const filteredlightKeys = lightKeys.filter(lk => lk.includes(k));
    palette[k]['light'] = {};
    filteredlightKeys.forEach(lk => {
      palette[k]['light'][lk] = themeSettings.schemes.light[lk];
    });

    const darkKeys = Object.keys(themeSettings.schemes.dark);
    const filteredDarkKeys = darkKeys.filter(dk => dk.includes(k));
    palette[k]['dark'] = {};
    filteredDarkKeys.forEach(dk => {
      palette[k]['dark'][dk] = themeSettings.schemes.dark[dk];
    });
  })
  return palette
}

function importStyles(themeSettings) {
  const stylesKeys = Object.keys(themeSettings.styles);
  const styles = {};
  stylesKeys.forEach(k => {
    const secondaryKeys = Object.keys(themeSettings.styles[k]);
    secondaryKeys.forEach(sk => {
      themeSettings.styles[k][sk].fontSize += 'px'
      themeSettings.styles[k][sk].lineHeight += 'px'
      styles[k+capitalize(sk)] = themeSettings.styles[k][sk];
    })
  })
  console.log(styles);
  return styles
}

export const appTheme = createTheme(importThemeSettings(themeSettingsJSON))