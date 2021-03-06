import { chakra, Heading, useToast } from "@chakra-ui/react";
import { Slot } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Reservations from "../../components/reservations";
import {
  createReservation,
  deleteReservation,
  getReservations,
} from "../../lib/api";
import { ReservationWithPermission } from "../../server/room/interceptors/reservation.interceptor";

const Room: NextPage = () => {
  const router = useRouter();
  const code = router.query["code"] as string;
  const toast = useToast();

  const [reservations, setReservations] = useState<ReservationWithPermission[]>(
    []
  );
  useEffect(() => {
    getReservations(code).then(setReservations);
  }, [code]);

  const bookRoom = async (slot: Slot) => {
    try {
      const reservation = await createReservation(code, slot);
      setReservations([...reservations, reservation]);
      toast({
        title: `Room booked`,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Failed to book room`,
        description: err.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const unbookRoom = async (slot: Slot) => {
    try {
      await deleteReservation(code, slot);
      setReservations(reservations.filter((r) => r.slot !== slot));
    } catch (err) {
      toast({
        title: `Failed to unbook room`,
        description: err.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Heading as={"h1"} textAlign={"center"} py={8}>
        Reservation for Room {code}
      </Heading>
      <chakra.section w={"100%"} maxW={"500px"} mx={"auto"}>
        <Reservations
          reservations={reservations}
          onBook={bookRoom}
          onUnbook={unbookRoom}
        />
      </chakra.section>
    </>
  );
};

export default Room;
