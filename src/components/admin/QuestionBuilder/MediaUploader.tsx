import React from "react";
import { createStyles, Grid, Text } from "@mantine/core";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";

const useStyles = createStyles((theme, _params, getRef) => ({
  fileInputWrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[1],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.sm,

    "&:hover": {
      cursor: "pointer",
    },

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      [`& .${getRef("child")}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  child: {
    // assign ref to element
    ref: getRef("child"),
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

type MediaUploaderProps = {
  setImage?: React.Dispatch<React.SetStateAction<FileWithPath | undefined>>;
};

export default function MediaUploader(props: MediaUploaderProps) {
  const { classes } = useStyles();

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    if (props.setImage) {
      props.setImage(acceptedFiles[0]);
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const image: FileWithPath = acceptedFiles[0] ?? null;

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <Grid
          className={classes.fileInputWrapper}
          sx={{ justifyContent: "center" }}
        >
          <input {...getInputProps()} />
          <Grid.Col span={12} sx={{}}>
            <Text size="sm">
              Drag 'n' drop some files here, or click to select files
            </Text>
          </Grid.Col>
          {image ? (
            <Grid.Col span={4} className={classes.child}>
              <div
                style={{
                  position: "relative",
                  minHeight: 120,
                  minWidth: 120,
                }}
              >
                <Image src={URL.createObjectURL(image)} layout="fill" />
              </div>
              <Text size="xs">
                {image.path} - {image.size} bytes
              </Text>
            </Grid.Col>
          ) : (
            <Grid.Col
              span={12}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text> No upload</Text>
            </Grid.Col>
          )}
        </Grid>
      </div>
    </>
  );
}
