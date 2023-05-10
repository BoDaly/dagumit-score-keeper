import React from "react";
import { Box, useTheme } from "@mui/material";

export default function appLayout({children}) {
  const theme = useTheme;
  return (
    <Box
      padding={3}
      bgcolor={theme().palette.primary.main}
      minHeight={'100vh'}
    >
      {children}
    </Box>
  )
};