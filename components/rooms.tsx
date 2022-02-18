import { Box, chakra, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { RoomDTO } from "../server/room/dtos/room.dto";

type RoomListProps = {
  rooms: RoomDTO[];
};

export default function Rooms({ rooms }: RoomListProps) {
  return (
    <chakra.ul w={"auto"} maxW={"320px"} mx={"auto"} listStyleType={"none"}>
      {rooms.map((room) => (
        <RoomItem key={room.code} room={room} />
      ))}
    </chakra.ul>
  );
}

function RoomItem({ room }: { room: RoomDTO }) {
  return (
    <li>
      <NextLink href={`/rooms/${room.code}`} passHref>
        <Link>
          <Box
            p={4}
            textAlign={"center"}
            borderColor={"gray.700"}
            borderWidth={2}
            borderRadius={"md"}
            bg={"gray.300"}
            mb={3}
            _hover={{
              bg: "gray.500",
            }}
          >
            <Heading size={"md"}>{room.code}</Heading>
            <Heading size={"xs"}>[{room.company}]</Heading>
          </Box>
        </Link>
      </NextLink>
    </li>
  );
}
