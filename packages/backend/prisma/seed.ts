// eslint-disable-next-line import/no-extraneous-dependencies -- is only used to seed the DB
import faker from 'faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main(): Promise<void> {
  await prisma.$connect();

  const userPromises = [];

  for (let index = 0; index < 10; index += 1) {
    userPromises.push(
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: 'starter123',
          username: faker.internet.userName(),
        },
      }),
    );
  }

  const users = await Promise.all(userPromises);

  const profilePromises = users.map((user) =>
    prisma.profile.create({
      data: {
        bio: faker.lorem.text(5),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userId: user.id,
      },
    }),
  );

  await Promise.all(profilePromises);

  const postPromises = users.map((user) =>
    prisma.post.createMany({
      data: [
        {
          title: faker.lorem.words(7),
          content: faker.lorem.text(5),
          published: true,
          authorId: user.id,
        },
        {
          title: faker.lorem.words(7),
          content: faker.lorem.text(5),
          published: false,
          authorId: user.id,
        },
        {
          title: faker.lorem.words(7),
          content: faker.lorem.text(5),
          published: true,
          authorId: user.id,
        },
      ],
    }),
  );

  await Promise.all(postPromises);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
