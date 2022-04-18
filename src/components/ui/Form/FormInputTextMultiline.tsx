import { Button, TextField, FormControl } from "@mui/material";
import React from "react";
import { Controller, useController } from "react-hook-form";

export interface FormInputTextMultilineProps {
  name: string;
  control: any;
  label: string;
  setOnChange: Function;
}

export const FormInputTextMultiline = ({
  name,
  control,
  label,
  setOnChange,
}: FormInputTextMultilineProps) => {

  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setOnChange(e.target.value)}
          />
        )}
      />
    </FormControl>
  );
};
