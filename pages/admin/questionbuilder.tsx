import * as React from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { FormInputDropdown } from "../../src/components/ui/Form/FormInputDropdown";
import { FormInputText } from "../../src/components/ui/Form/FormInputText";
import { FormInputTextMultiline } from "../../src/components/ui/Form/FormInputTextMultiline";
import {
  Box,
  FormControl,
  Container,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from "@mui/material";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

export default function QuestionBuilder() {
  const [isUpload, setIsUpload] = React.useState(true);
  const [file, setFile] = React.useState<string>();
  const [fileData, setFileData] = React.useState<FormData>();
  const [questionTextInput, setQuestionTextInput] = React.useState<string>("");

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    if (!files) return;
    setFile(URL.createObjectURL(files[0]) as string);
  };

  

  const { register, reset, handleSubmit, control } = useForm();

  return (
    <Grid
      container
      direction="row"
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid
        item
        xs={6}
        sx={{
          padding: 3,
        }}
      >
        <Grid container direction="column" justifyContent="center">
          <Grid
            item
            sx={{
              width: "300px",
              height: "300px",
              position: "relative",
            }}
          >
            {file ? <Image src={file} layout="fill" objectFit="contain" /> : ""}
          </Grid>
          <Grid
            item
            sx={{
              padding: 3,
              width: "75%",
              alignSelf: "center",
            }}
          >
            <TeX>{}</TeX>
          </Grid>
          <Grid item sx={{ padding: 3, alignSelf: "left" }}>
            <TeX>{questionTextInput}</TeX>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Grid
            container
            rowSpacing={3}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderRadius: 5,
              borderColor: "secondary",
              paddingY: 5,
              marginTop: -1,
            }}
          >
            <Grid item>
              <FormInputDropdown
                label="Difficulty"
                name="difficulty-select"
                control={control}
                options={[
                  { label: "simple", value: 1 },
                  { label: "easy", value: 2 },
                  { label: "medium", value: 3 },
                  { label: "hard", value: 4 },
                  { label: "very hard", value: 5 },
                ]}
              />
            </Grid>
            <Grid item>
              
            </Grid>
            <Grid item>
              <FormInputTextMultiline
                label="Question Text"
                name="question-text"
                control={control}
                setOnChange={setQuestionTextInput}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" component="label">
                Upload Image
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" component="label">
                Submit Question
                <input type="submit" hidden />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
