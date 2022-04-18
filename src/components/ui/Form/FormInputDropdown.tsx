import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps, OptionProps } from "./FormInputProps";

export const FormInputDropdown: React.FC<FormInputProps & OptionProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateSingleOptions = () => {
    if (!options) return;
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size="small">
      <InputLabel id="select-input-label">{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            id="select-input"
            labelId="select-input-label"
            label={label}
            onChange={onChange}
            value={value}
            sx={{ minWidth: 120 }}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
