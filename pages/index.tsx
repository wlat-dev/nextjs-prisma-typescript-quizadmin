import * as React from "react";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next/types";
import prisma from "../src/utils/prisma";
import Link from "next/link";
import { Module, Course } from "@prisma/client";

export default function Home({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {courses.map((course: Course) => (
        <li key={course.id}>
          <Link href={`/course/${course.title}`}>
            <a>{course.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const courses = await prisma.course.findMany({});
  return {
    props: {
      courses,
    },
  };
};

Home.auth = true;
