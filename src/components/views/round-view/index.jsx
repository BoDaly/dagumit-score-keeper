import React from "react";
import { Grid } from "@mui/material";
import { BidView, TricksView } from "..";

export default function Round({
  roundCount,
  nextRound,
  roundId,
  players,
  setPhase,
  phase,
  updateBid,
  updateTricks,
  previousRound,
}){

  const bidProps = {
    roundCount,
    togglePhase,
    roundId,
    players,
    updateBid,
    previousRound,
  }
  
  const tricksProps = {
    roundCount,
    togglePhase,
    nextRound,
    roundId,
    players,
    updateTricks,
  }

  function togglePhase() {
    if(phase === 'bid'){ setPhase('tricks') }
    else { setPhase('bid') }
  }

  return (
    <Grid container gap={2} minWidth={'100%'}>
      {
        phase === 'bid' ?
        (<BidView {...bidProps}/>) :
        (<TricksView {...tricksProps}/>)
      }
    </Grid>
  )
}