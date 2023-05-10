import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { appTheme } from '../../theme/theme'
import AppLayout from '../app-layout';
import ScoreKeeper from '../score-keeper';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AppLayout>
        <ScoreKeeper />
      </AppLayout>
    </ThemeProvider>
  )
}