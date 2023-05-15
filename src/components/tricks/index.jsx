import { 
  Typography,
  Grid,
  Input,
  FormControl,
  InputLabel,
  Box,
  Button,
  useTheme,
 } from "@mui/material";
import React from "react";
import { RoundHelper } from "../round-helper";

export default function Tricks({updateTricks, nextRound, players, roundId}){
  const theme = useTheme();
  const tricksInputs = players.map(player => {
    return (
      <Grid item key={`player-${player.id}-tricks-round-${roundId}-grid-item`}>
        <FormControl key={`player-${player.id}-tricks-round-${roundId}-control`}>
          <InputLabel id={`player-${player.id}-tricks-round-${roundId}-label`}> {player.name} </InputLabel>
          <Input
            id={`player-${player.id}-tricks-round-${roundId}-control`}
            type={'number'}
            defaultValue={0}
            onChange={(e) => {updateTricks(roundId, player.id, Number.parseInt(e.target.value))}}
            onFocus={(e) => {e.target.select()}}
          />
        </FormControl>
        <Box>
          <Typography variant="titleSmall">bid:</Typography>
          <Typography variant="titleSmall" color={theme.palette.primary.main}> {player.rounds[roundId].bid} </Typography>
        </Box>
      </Grid>
    )
  })
  return (
    <Grid container gap={2} minWidth={'100%'}>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Round: </Typography>
        <Typography variant="titleLarge" color={theme.palette.primary.main}> {roundId} </Typography>
        <RoundHelper roundCounter trickTracker />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Tricks taken: </Typography>
      </Grid>
      {tricksInputs}
      <Grid item xs={12} textAlign={'right'}>
        <Button variant="contained" onClick={() => {nextRound()}}>Confirm</Button>
      </Grid>
    </Grid>
  )
}