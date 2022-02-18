import { Avatar, Box, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import AccountForm from "../components/forms/account-form";
import { getUserInfo, updateUserInfo } from "../lib/api";
import { UpdateUserDTO } from "../server/user/dtos/update-user.dto";

const AccountPage: NextPage = () => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UpdateUserDTO | null>(null);
  useEffect(() => {
    getUserInfo().then((dto) => {
      const { name, company } = dto;
      setUserInfo({ name, company });
    });
  }, []);
  const toast = useToast();

  const onSaveUserInfo = async (userInfo: UpdateUserDTO) => {
    try {
      await updateUserInfo(userInfo);
      toast({
        title: `User info updated`,
        description: `We have updated the information about ${userInfo.name}.`,
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.error(`Failed to update user!`, err);
      toast({
        title: `Update failed`,
        description: `Ops, something went wrong! Retry later.`,
        status: "error",
        isClosable: true,
      });
    }
  };

  if (typeof window !== "undefined" && status === "loading") return null;

  if (!session) {
    return (
      <>
        <Head>Access denied</Head>
        <h1>Sorry, you need to login</h1>
      </>
    );
  }
  return (
    <>
      <Head>Room Booking - Account</Head>

      {userInfo ? (
        <Box
          maxW={"320px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          mx={"auto"}
          mt={8}
        >
          <Avatar
            size={"xl"}
            src={session.user?.image}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <AccountForm user={userInfo} onSubmit={onSaveUserInfo} />
        </Box>
      ) : null}
    </>
  );
};

export default AccountPage;
