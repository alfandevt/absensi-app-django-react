import { faker } from "@faker-js/faker";
faker.locale = "id_ID";

export function genUserData(amount = 10) {
  let list = [];
  for (let i = 0; i < amount; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    list.push({
      id: faker.phone.number("127######"),
      nik: faker.phone.number("31##############"),
      name: `${firstName} ${lastName}`,
      username: faker.internet.userName(firstName),
      telp: faker.phone.number("08##########"),
      email: faker.internet.email(firstName),
      division: faker.name.jobArea(),
      birthdate: faker.date.birthdate({ min: 18, max: 40, mode: "age" }),
      photo: faker.internet.avatar(),
      role: faker.name.jobTitle(),
    });
  }
  return list;
}
