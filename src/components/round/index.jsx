import React, { useState } from "react";
import { Grid } from "@mui/material";
import Bid from "../bid";
import Tricks from "../tricks";

export default function Round({
  roundCount,
  nextRound,
  roundId,
  players,
  setPhase,
  phase,
  updateBid,
  updateTricks,
}){
  console.log(players);
  const bidProps = {
    roundCount,
    nextPhase,
    roundId,
    players,
    updateBid,
  }
  const tricksProps = {
    roundCount,
    nextRound,
    roundId,
    players,
    updateTricks,
  }

  function nextPhase() {
    if(phase === 'bid'){ setPhase('tricks') }
    else { setPhase('bid') }
  }

  return (
    <Grid container gap={2} minWidth={'100%'}>
      {
        phase === 'bid' ?
        (<Bid {...bidProps}/>) :
        (<Tricks {...tricksProps}/>)
      }
    </Grid>
  )
}