import { ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ children, href }: NavLinkProps) => (
  <NextLink href={href}>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function Navbar() {
  const { data, status } = useSession();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <NavLink href="/">Room Booking</NavLink>
          </Box>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          ></HStack>
        </HStack>
        {status === "authenticated" ? (
          <div>
            <NavLink href="/account">Account</NavLink>
            {data?.user?.image ? (
              <Avatar src={data.user.image} size={"sm"} mx={"4"} />
            ) : null}
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            onClick={() => signIn("auth0")}
          >
            Sign In
          </Button>
        )}
      </Flex>
    </Box>
  );
}
