import { chakra, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Reservations from "../../components/reservations";
import { getReservations } from "../../lib/api";
import { ReservationDTO } from "../../server/room/dtos/reservation.dto";

const Room: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const [reservations, setReservations] = useState<ReservationDTO[]>([]);
  useEffect(() => {
    getReservations(code as string).then(setReservations);
  }, [code]);

  console.log(reservations);

  return (
    <>
      <Heading as={"h1"} textAlign={"center"} py={8}>
        Reservation for Room {code}
      </Heading>
      <chakra.section w={"100%"} maxW={"500px"} mx={"auto"}>
        <Reservations reservations={reservations} />
      </chakra.section>
    </>
  );
};

export default Room;
