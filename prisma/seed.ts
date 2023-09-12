import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const genre = await prisma.genre.create({
    data: {
      name: 'Science Fiction',
    },
  });

  const movie = await prisma.movie.create({
    data: {
      title: 'The Matrix',
      description: 'Welcome to the Real World',
      releaseDate: new Date('1999-03-31'),
      genre: {
        connect: {
          id: genre.id,
        },
      },
    },
  });

  console.log({ genre, movie });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
