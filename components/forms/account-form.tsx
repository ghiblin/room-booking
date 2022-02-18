import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../server/user/dtos/user.dto";

type AccountFormProps = {
  user: UserDTO;
  onSubmit: (user: UserDTO) => void;
};

const AccountForm = ({ user, onSubmit }: AccountFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserDTO>({ defaultValues: user });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="Your name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 3, message: "Minimum length should be 3" },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.company)}>
        <FormLabel htmlFor="company">Company</FormLabel>
        <Select id="company" {...register("company")}>
          <option value={"COKE"}>COKE</option>
          <option value={"PEPSI"}>PEPSI</option>
        </Select>
      </FormControl>
      <Button
        mt={4}
        colorScheme={"orange"}
        isLoading={isSubmitting}
        type={"submit"}
      >
        Save
      </Button>
    </form>
  );
};

export default AccountForm;
