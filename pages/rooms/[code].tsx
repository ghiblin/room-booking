import { chakra, Heading, useToast } from "@chakra-ui/react";
import { Slot } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Reservations from "../../components/reservations";
import { createReservation, getReservations } from "../../lib/api";
import { ReservationDTO } from "../../server/room/dtos/reservation.dto";

const Room: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const toast = useToast();

  const [reservations, setReservations] = useState<ReservationDTO[]>([]);
  useEffect(() => {
    getReservations(code as string).then(setReservations);
  }, [code]);

  const bookRoom = async (slot: Slot) => {
    try {
      const reservation = await createReservation(code as string, slot);
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

  return (
    <>
      <Heading as={"h1"} textAlign={"center"} py={8}>
        Reservation for Room {code}
      </Heading>
      <chakra.section w={"100%"} maxW={"500px"} mx={"auto"}>
        <Reservations reservations={reservations} onBook={bookRoom} />
      </chakra.section>
    </>
  );
};

export default Room;
