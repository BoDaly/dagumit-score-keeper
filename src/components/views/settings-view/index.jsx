import React from "react";
import { Button, FormControl, Grid, Input, IconButton, Typography, useTheme } from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { RoundHelper } from "../../round-helper";

export default function SettingsView({
  addPlayer,
  updatePlayerName,
  removePlayer,
  players,
  roundCount,
  nextRound,
}) {
  const theme = useTheme();

  function playerNameInputs() {
    return players.map(player => {
      return (
        <Grid item key={`player-${player.id}-name-grid-item`}>
          <FormControl>
            <Input
              id={`player-${player.id}-name`}
              aria-describedby={`player-${player.id}-name`}
              placeholder={player.name}
              onChange={ e => {
                updatePlayerName(player.id,e.target.value);
              }}
            />
          </FormControl>
        </Grid>
      )
    })
  }

  return (
    <Grid container gap={2} minWidth={'100%'}>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Players: </Typography>
        <Typography variant="titleLarge" color={theme.palette.primary.main}> {players.length} </Typography>
        <RoundHelper roundCounter />
      </Grid>
      {playerNameInputs()}
      <Grid item xs={12}>
        <IconButton onClick={() => { addPlayer() }}>
          <AddCircle color={'primary'}/>
        </IconButton>
        <IconButton onClick={() => { removePlayer(players.length) }}>
          <RemoveCircle color={'action'}/>
        </IconButton>
      </Grid>
      <Grid item xs={12} textAlign={'right'}>
        <Button variant="contained" onClick={() => {nextRound()}}>Confirm</Button>
      </Grid>
    </Grid>
  )
}