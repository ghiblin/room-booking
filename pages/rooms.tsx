import { Heading, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Rooms from "../components/rooms";
import { getRooms } from "../lib/api";
import { RoomDTO } from "../server/room/dtos/room.dto";

const RoomsPage: NextPage = () => {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const toast = useToast();

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch((error) => {
        toast({
          title: `Something went wrong`,
          description: error.message || error,
          status: "error",
          isClosable: true,
        });
      });
  }, []);

  return (
    <section>
      <Heading size={"2xl"} textAlign="center" mb={16}>
        Pick a room
      </Heading>
      <Rooms rooms={rooms} />
    </section>
  );
};

export default RoomsPage;
