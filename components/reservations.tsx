import { CloseIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Grid, IconButton } from "@chakra-ui/react";
import { Slot } from "@prisma/client";
import React, { PropsWithChildren } from "react";
import { SLOTS, slotToString } from "../lib/utils";
import { ReservationWithPermission } from "../server/room/interceptors/reservation.interceptor";

type ReservationsProps = {
  reservations: ReservationWithPermission[];
  onBook: (slot: Slot) => void;
  onUnbook: (slot: Slot) => void;
};

function ReservationBox({
  children,
  ...props
}: PropsWithChildren<Pick<BoxProps, "bg" | "onClick" | "cursor">>) {
  return (
    <Box
      flex={1}
      borderRadius={"md"}
      textAlign={"center"}
      lineHeight={"4rem"}
      position={"relative"}
      {...props}
    >
      {children}
    </Box>
  );
}

export default function Reservations({
  reservations,
  onBook,
  onUnbook,
}: ReservationsProps) {
  function renderRow(slot: Slot, reservation?: ReservationWithPermission) {
    return (
      <React.Fragment key={slot}>
        <Box lineHeight={"4rem"}>{slotToString(slot)}</Box>
        {reservation ? (
          <ReservationBox bg={"red"}>
            {reservation.user?.name}
            {reservation.canDelete && (
              <IconButton
                onClick={() => onUnbook(slot)}
                variant={"ghost"}
                aria-label="Unbook room"
                icon={<CloseIcon />}
                size={"xs"}
                position={"absolute"}
                right={4}
                top={"calc(2rem - 12px)"} // 2rem it's half line height and 12px is half icon size
              />
            )}
          </ReservationBox>
        ) : (
          <ReservationBox
            bg={"green.500"}
            cursor={"pointer"}
            onClick={() => onBook(slot)}
          >
            Click to book
          </ReservationBox>
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
