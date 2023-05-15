import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from '../../theme/theme'
import AppLayout from '../app-layout';
import ScoreKeeper from '../score-keeper';
import { AppContext, AppContextSource } from "../../store";

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <AppContext.Provider value={AppContextSource()}>
        <AppLayout>
          <ScoreKeeper />
        </AppLayout>
      </AppContext.Provider>
      <CssBaseline />
    </ThemeProvider>
  )
}