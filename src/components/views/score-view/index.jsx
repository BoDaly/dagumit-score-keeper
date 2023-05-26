import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  SwipeableDrawer,
  useTheme,
  styled,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";

export default function ScoreView({players, roundId}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const roundLabels = [];
  const tableItemHeight = 57;
  
  for(let i = 1; i < roundId; i++){
    roundLabels.push(`Round ${i}`)
  }

  const StrictHeightRow = styled(TableRow)(({ theme }) => `
  height: ${tableItemHeight}px
  `)

  useEffect(() => {

    console.log('players changed')
  }, [players])

  const totals = useMemo(() => {
    return players.map(player => {
      const roundScores = []
      player.rounds.forEach(round => {
        console.log(round);
        if(round.score) roundScores.push(round.score);
      })
      let roundTotal = 0;
      if(roundScores.length > 0) roundTotal = roundScores.reduce((a,b) => a+b);
      return roundTotal
    })
  }, [players])

  const scoreHeight = useMemo(() => {
    if ( roundId && roundId > 0 ) return (roundId - 1) * tableItemHeight;
    return roundId * tableItemHeight;
  }, [roundId])

  const closedPosition = useMemo(() => {
    return open ? '0' : `-${tableItemHeight * 2}px`;
  }, [open, roundId])

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        onOpen={() => { setOpen(true) }}
        onClose={() => { setOpen(false) }}
        open={open}
        hysteresis={0.25}
        // onClick={() => { setOpen(!open) }}
        swipeAreaWidth={'114px'}
        sx={{
          '.MuiPaper-root': {
            overflowY: 'visible',
            transform: `translateY(${scoreHeight + 114}px) ${!open ? '!important' : 'translateY(0px)'}`
          }
        }}
      >
        <TableContainer sx={{
          backgroundColor: 'Background',
          visibility: 'visible',
          transform: `${!open ? 'translateY(-' + (tableItemHeight * 2) + 'px)}' : 'translateY(0px)' }`,
          // height: `${scoreHeight}px`,
          '.MuiTable-root': {
            tableLayout: 'fixed'
          }
        }}>
          <Table>
            <TableHead>
              <StrictHeightRow>
                <TableCell>
                  {' '}
                </TableCell>
                {players.map((player,i) => (
                  <TableCell key={`player-${i}-header-table-cell`}>
                    {player.name}
                  </TableCell>
                ))}
              </StrictHeightRow>
            </TableHead>
            <TableBody>
              <StrictHeightRow>
                <TableCell>
                  <Typography color={theme.palette.primary.main}>Total</Typography>
                </TableCell>
                {totals.map((total, i) => {
                  return (
                    <TableCell key={`player-table-cell-total-${i}`}>
                      <Typography color={theme.palette.primary.main}>{total}</Typography>
                    </TableCell>
                  )
                })}
              </StrictHeightRow>
              {roundLabels.map((rl,i) => {
                const roundCount = i+1;
                return (
                  <StrictHeightRow key={`round-${roundCount}-table-row`}>
                    <TableCell>
                      {rl}
                    </TableCell>
                    {players.map((player, ii) => {
                      return (
                        <TableCell key={`round-${roundCount}-player-${ii}-table-cell`}>
                          {player.rounds[roundCount].score}
                        </TableCell>
                      )
                    })}
                  </StrictHeightRow>
                )
              })}

            </TableBody>
          </Table>
        </TableContainer>
      </SwipeableDrawer>
    </>
  )
}