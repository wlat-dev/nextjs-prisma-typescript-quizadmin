import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import {
  Paper,
  Container,
  Grid,
  TextInput,
  NumberInput,
  useMantineTheme,
  Textarea,
  MultiSelect,
  Button,
} from "@mantine/core";
import { GetStaticProps } from "next/types";
import { Quiz, Topic } from "@prisma/client";
import prisma from "../../src/utils/prisma";
import { useS3Upload } from "next-s3-upload";

interface Props {
  quizzes: Quiz[];
  topics: Topic[];
}

export default function questionbuilder(props: Props) {
  const [difficulty, setDifficulty] = React.useState<number>(0);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [equation, setEquationValue] = React.useState<string>("");
  const [questionText, setQuestionText] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string>("");
  const [selectedQuizTitles, setSelectedQuizTitles] = React.useState<
    Array<string>
  >([]);
  const [selectedTopicTitles, setSelectedTopicTitles] = React.useState<
    Array<string>
  >([]);

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  function getSelectOptions<T extends { title: string }>(
    options: Array<T>
  ): Array<{ value: string; label: string }> {
    return options.map((option: T, index: number) => ({
      value: option.title,
      label: option.title,
    }));
  }

  const theme = useMantineTheme();

  const handleFileChange = async (file: File) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      difficulty: difficulty,
      image_url: imageUrl,
      equation: equation,
      question_text: questionText,
      answer_formula: answer,
      quizzes: props.quizzes.filter((quiz: Quiz) =>
        selectedQuizTitles.includes(quiz.title)
      ),
      topics: props.topics.filter((topic: Topic) =>
        selectedTopicTitles.includes(topic.title)
      ),
    };
    fetch("/api/questions/", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <Container size="lg">
      <Paper shadow="sm" radius="lg" p="md">
        <form onSubmit={handleSubmit}>
          <Grid grow gutter="xl" styles={{ alignItems: "center" }}>
            <Grid.Col span={6}>
              <TextInput
                label="Equation"
                value={equation}
                onChange={(event) => setEquationValue(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={6} mt="lg">
              <ReactMarkdown
                children={`${equation}`}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Difficulty"
                value={difficulty}
                defaultValue={0}
                min={0}
                max={5}
                step={1}
                onChange={(val: number) => setDifficulty(val)}
              />
            </Grid.Col>
            <Grid.Col span={6} mt="lg">
              {difficulty}
            </Grid.Col>
            <Grid.Col span={12} mt="lg">
              <FileInput onChange={handleFileChange} />
              <Button onClick={openFileDialog}>Upload file</Button>
            </Grid.Col>
            <Grid.Col span={12} mt="lg">
              <Textarea
                label="Question Text"
                value={questionText}
                onChange={(event) => setQuestionText(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col
              span={12}
              sx={{
                padding: theme.spacing.md,
                fontSize: theme.fontSizes.sm,
              }}
            >
              <ReactMarkdown
                children={`${questionText}`}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                data={props.quizzes ? getSelectOptions(props.quizzes) : []}
                value={selectedQuizTitles}
                onChange={setSelectedQuizTitles}
                label="Quizzes this question will be assigned to"
                placeholder="Select quizzes"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                data={props.topics ? getSelectOptions(props.topics) : []}
                value={selectedTopicTitles}
                onChange={setSelectedTopicTitles}
                label="Topics to assign to question"
                placeholder="Select topics"
              />
            </Grid.Col>
            <Button type="submit" mx="auto" mt="lg">
              Submit
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const quizzes = await prisma.quiz.findMany();
  const topics = await prisma.topic.findMany();
  return {
    props: {
      quizzes,
      topics,
    },
  };
};
