import { 
  Typography,
  Grid,
  Input,
  FormControl,
  InputLabel,
  Chip,
  Button,
  useTheme,
 } from "@mui/material";
import React from "react";

export default function Bid({updateBid, nextPhase, players, roundId}){
  const theme = useTheme();
  const bidInputs = players.map(player => {
    return (
      <Grid item key={`player-${player.id}-bid-round-${roundId}-grid-item`}>
        <FormControl key={`player-${player.id}-bid-round-${roundId}-control`}>
          <InputLabel id={`player-${player.id}-bid-round-${roundId}-label`}> {player.name} </InputLabel>
          <Input
            id={`player-${player.id}-bid-round-${roundId}-control`}
            type={'number'}
            defaultValue={0}
            onChange={(e) => {updateBid(roundId, player.id, Number.parseInt(e.target.value))}}
          />
        </FormControl>
      </Grid>
    )
  })

  return (
    <Grid container gap={2} minWidth={'100%'}>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Round: </Typography>
        <Typography variant="titleLarge" color={theme.palette.primary.main}> {roundId} </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Bids: </Typography>
      </Grid>
      {bidInputs}
      <Grid item xs={12} textAlign={'right'}>
        <Button variant="contained" onClick={() => {nextPhase()}}>Confirm</Button>
      </Grid>
    </Grid>
  )
}