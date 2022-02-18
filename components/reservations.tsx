import { Box, BoxProps, Grid } from "@chakra-ui/react";
import { Slot } from "@prisma/client";
import React, { PropsWithChildren } from "react";
import { SLOTS, slotToString } from "../lib/utils";
import { ReservationDTO } from "../server/room/dtos/reservation.dto";

type ReservationsProps = {
  reservations: ReservationDTO[];
};

function ReservationBox({
  bg,
  children,
}: PropsWithChildren<Pick<BoxProps, "bg">>) {
  return (
    <Box
      flex={1}
      borderRadius={"md"}
      textAlign={"center"}
      lineHeight={"4rem"}
      bg={bg}
    >
      {children}
    </Box>
  );
}

export default function Reservations({ reservations }: ReservationsProps) {
  function renderRow(slot: Slot, reservation?: ReservationDTO) {
    return (
      <React.Fragment key={slot}>
        <Box lineHeight={"4rem"}>{slotToString(slot)}</Box>
        {reservation ? (
          <ReservationBox bg={"red"}>{reservation.user?.name}</ReservationBox>
        ) : (
          <ReservationBox bg={"green.500"} />
        )}
      </React.Fragment>
    );
  }
  return (
    <Grid
      gap={2}
      templateColumns={"75px 1fr"}
      templateRows={`repeat(${SLOTS.length}, 4rem)`}
    >
      {SLOTS.map((slot) => {
        const reservation = reservations.find((r) => r.slot === slot);
        return renderRow(slot, reservation);
      })}
    </Grid>
  );
}
