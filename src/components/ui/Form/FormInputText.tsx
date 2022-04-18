import { Button, TextField, FormControl } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export interface FormInputTextProps {
  name: string;
  control: any;
  label: string;
  onEquationChange: Function;
}

type FormValues = {
  TextField: string;
};

export const FormInputText = ({ name, control, label }: FormInputTextProps) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            value={value}
            label={label}
            name={name}
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
        )}
      />
    </FormControl>
  );
};
