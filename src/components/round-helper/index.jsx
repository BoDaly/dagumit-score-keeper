import { useContext } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import { AppContext } from "../../store";

export function RoundHelper({
  roundCounter,
  trickTracker,
}) {
  const theme = useTheme();
  const { roundCount, players, deckSize, roundId } = useContext(AppContext);

  const roundCounterChipContents = (
    <Box>
      <Typography variant="titleSmall" color={theme.palette.grey[500]}> Rounds: </Typography>
      <Typography
        variant="titleSmall"
        color={theme.palette.primary.main}
      >
        {roundCount}
      </Typography>
    </Box>
  )

  const tricksChipContents = (
    <Box>
      <Typography variant="titleSmall" color={theme.palette.grey[500]}> Tricks: </Typography>
      <Typography
        variant="titleSmall"
        color={theme.palette.primary.main}
      >
        {roundId < (roundCount / 2) ? roundId : (roundCount + 1) - roundId}
      </Typography>
    </Box>
  )

  return (
    <>
      {roundCounter ? (
        <Chip
          size={'small'}
          label={roundCounterChipContents}
          sx={{
            marginRight: 1
          }}
        />
      ) : null}
      {trickTracker ? (
        <Chip
          size={'small'}
          label={tricksChipContents}
          sx={{
            marginRight: 1
          }}
        />
      ) : null}
    </>
  )
}