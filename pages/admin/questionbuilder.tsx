import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { useForm } from "@mantine/form";
import {
  Paper,
  Container,
  Grid,
  TextInput,
  NumberInput,
  useMantineTheme,
  Text,
  Textarea,
  createStyles,
  MultiSelect,
  Button,
} from "@mantine/core";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useQuery } from "react-query";
import {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageContext,
} from "next/types";
import prisma from "../../src/utils/prisma";

import { Prisma, Question, Quiz, Topic } from "@prisma/client";

import MediaUploader from "../../src/components/admin/QuestionBuilder/MediaUploader";
import { useSession } from "../../src/utils/useSession";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { string } from "zod";


export default function questionbuilder({
  topics,
  quizzes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [difficulty, setDifficulty] = React.useState<number>(0);
  const [image, setImage] = React.useState<FileWithPath | undefined>();
  const [equation, setEquationValue] = React.useState<string>("");
  const [questionText, setQuestionText] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string>("");
  const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz>();
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>();


  // let quizOptions: object[][] = [];
  // if (quizzes) {
  //   quizzes.forEach((quiz: Quiz) => {
  //     quizOptions.push([
  //       quiz,
  //       {
  //         label: quiz.quiz_title,
  //         value: quiz.id,
  //       },
  //     ]);
  //   });
  // }

  const theme = useMantineTheme();

  const postQuestion = () => {
    const data = {
      difficulty: difficulty,
      image_url: image ? URL.createObjectURL(image) : null,
      equation: equation,
      question_text: questionText,
      answer_formula: answer,
      topics: selectedTopic,
      quizzes: selectedQuiz,
    };
    fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postQuestion();
  };

  return (
    <Container size="lg">
      <Paper shadow="sm" radius="lg" p="md">
        <form onSubmit={handleSubmit}>
          <Grid grow gutter="xl" styles={{ alignItems: "center" }}>
            {/* Equation */}
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
            {/* Difficulty */}
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
              <MediaUploader setImage={setImage} />
            </Grid.Col>
            {/* Question Text */}
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
            {/* Answer */}
            <Grid.Col span={12}>
              <Textarea
                label="Answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={12} mt={"lg"}>
              <select
                onChange={(e) => setSelectedQuiz(quizzes[e.target.value])}
              >
                {quizzes.map((option: Quiz, index: number) => (
                  <option key={index} value={index}>
                    {option.quiz_title}
                  </option>
                ))}
              </select>
            </Grid.Col>
            <Grid.Col span={12} mt={"lg"}>
              <select
                onChange={(e) => setSelectedTopic(topics[e.target.value])}
              >
                {topics.map((option: Topic, index: number) => (
                  <option key={index} value={index}>
                    {option.topic_title}
                  </option>
                ))}
              </select>
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
  const topics = await prisma.topic.findMany();

  const quizzes: Quiz[] = await prisma.quiz.findMany();

  return {
    props: {
      topics,
      quizzes,
    },
  };
};
