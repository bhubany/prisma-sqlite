import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create() {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@gmail.com",
    },
  });
  console.log(user);
}

async function read() {
  // ... you will write your Prisma Client queries here
  const users = await prisma.user.findMany();
  console.log(users);
}

// relations between user and posts
async function createUserWithPost() {
  // ... you will write your Prisma Client queries here
  const users = await prisma.user.create({
    data: {
      name: "hari2",
      email: "hari2@gmail.com",
      posts: {
        create: {
          title: "Hello World 2",
        },
      },
    },
  });
  console.log(users);
}

async function usersWithPosts() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  // log all the user with posts, also display nested posts value instead of [Object]
  console.dir(usersWithPosts, { depth: null });
}

usersWithPosts()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
  Note: To view datas through prisma gui: npx prisma studio

  */
