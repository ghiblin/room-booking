import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { UpdateUserDTO } from "../../server/user/dtos/update-user.dto";

type AccountFormProps = {
  user: UpdateUserDTO;
  onUpdateUser: (user: UpdateUserDTO) => void;
};

const AccountForm = ({ user, onUpdateUser }: AccountFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserDTO>({ defaultValues: user });

  const onSubmit = (values: UpdateUserDTO) => {
    // HTML Select need a string value, so I need to convert empty string back to null
    if (!values.company) {
      values.company = null;
    }
    onUpdateUser(values);
  };

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
          <option value={""}>Choose a company</option>
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
