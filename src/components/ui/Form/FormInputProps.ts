export type Option = {
  label: string;
  value: string | number;
};

export interface OptionProps {
  options: Option[];
}

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}
