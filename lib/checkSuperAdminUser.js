import prisma from "./prisma";
import bcrypt from "bcrypt";

export async function checkSuperAdminUser() {
  const superAdminUser = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!superAdminUser) {
    const saltRounds = 10;
    const password = "superadminpassword";

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await prisma.user.create({
      data: {
        username: "superadmin",
        password: hashedPassword,
      },
    });

    console.log("Superadmin user created:", createdUser);
  }
}
