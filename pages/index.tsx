import { chakra, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Rooms from "../components/rooms";
import { getRooms } from "../lib/api";
import { RoomDTO } from "../server/room/dtos/room.dto";

const Index: NextPage = () => {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  return (
    <chakra.section py={32} textAlign={"center"}>
      <Heading size={"3xl"} as={"h1"}>
        Welcome to our Room Booking System
      </Heading>
    </chakra.section>
  );
};

export default Index;
