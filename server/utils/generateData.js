import { faker } from "@faker-js/faker";

const categories = [""]



const generateSingleQuestion = () => ({
  question: faker.lorem.sentence(),
  answer: faker.lorem.sentence(),
  difficulty: faker.number.int({ min: 0, max: 10 }),
  categories: Array.from({ length: 3 }).map(() => categories[Math.floor(Math.random) * categories.length]),
});

export const generateManyQuestions = () =>
  Array.from({ length: 1000 }).map(() => generateSingleQuestion());
