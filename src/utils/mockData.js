// faker
import { faker } from '@faker-js/faker';
// lodash
import _ from 'lodash';
// constants
import { EXAM_RULES, LESSON_BRANCH } from './constants';

export const subjects = Array.from({ length: 12 }).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  photoURL: faker.image.people(480, 480, true),
  description: faker.commerce.productDescription(),
  teachers: Array.from({ length: 20 }).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    photoURL: faker.image.people(480, 480, true),
  })),
  classes: [
    {
      grade: {
        name: 'Khối 1',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 2',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 3',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 4',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 5',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 6',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 7',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 8',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 9',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 10',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 11',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
    {
      grade: {
        name: 'Khối 12',
        classes: Array.from({ length: faker.datatype.number({ min: 5, max: 15 }) }).map(() =>
          faker.name.fullName()
        ),
        students: faker.datatype.number({ min: 200, max: 400 }),
      },
    },
  ],
  branch: _.sampleSize(LESSON_BRANCH, 1),
  numberOfLessons: faker.datatype.number({ min: 30, max: 50 }) + ' tiết',
  examRules: _.sampleSize(EXAM_RULES, 3),
  createdBy: faker.name.fullName(),
  updatedBy: faker.name.fullName(),
  createdAt: faker.datatype.datetime(),
  updatedAt: faker.datatype.datetime(),
})); // mock data

export const permissions = Array.from({ length: 20 }).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  role: faker.name.firstName(),
  description: faker.commerce.productDescription(),
  permissions: Array.from({ length: 20 }).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  })),
  createdBy: faker.name.fullName(),
  updatedBy: faker.name.fullName(),
  createdAt: faker.datatype.datetime(),
  updatedAt: faker.datatype.datetime(),
})); // mock data
