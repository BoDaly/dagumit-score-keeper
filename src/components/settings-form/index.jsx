import React from "react";
import { Button, FormControl, Grid, Input, Chip, IconButton, Box, Typography, useTheme } from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";

export default function SettingsForm({
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

  const subTitle = (
    <Box>
      <Typography variant="titleSmall" color={theme.palette.grey[500]}> Rounds: </Typography>
      <Typography variant="titleSmall" color={theme.palette.primary.main}> {roundCount} </Typography>
    </Box>
  )

  return (
    <Grid container gap={2} minWidth={'100%'}>
      <Grid item xs={12}>
        <Typography variant="titleLarge"> Players: </Typography>
        <Typography variant="titleLarge" color={theme.palette.primary.main}> {players.length} </Typography>
        <Chip size={'small'} label={subTitle} />
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