import { 
  Typography,
  Grid,
  Input,
  FormControl,
  InputLabel,
  Button,
  useTheme,
 } from "@mui/material";
import React, { useEffect } from "react";
import { RoundHelper } from "../round-helper";

export default function Bid({
  updateBid,
  togglePhase,
  players,
  roundId,
  previousRound,
}){
  const theme = useTheme();
  
  // Use effect to zero out bid when re-entering the bid view.
  useEffect(() => {
    players.forEach((player) => {
      updateBid(roundId, player.id, player.rounds[roundId].bid = 0)
    })
  }, [])

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
            onFocus={(e) => {e.target.select()}}
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
        <RoundHelper roundCounter trickTracker />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Bids: </Typography>
      </Grid>
      {bidInputs}
      <Grid item xs={12} textAlign={'right'}>
        <Button variant="contained" onClick={() => {togglePhase()}}>Confirm</Button>
        <Button variant="text" onClick={() => {previousRound()}}>Back</Button>
      </Grid>
    </Grid>
  )
}