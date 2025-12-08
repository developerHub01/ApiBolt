import { faker } from "@faker-js/faker";
import { TGlobalEnvType } from "@/types/global-env.types";

export const generateFake = (type: TGlobalEnvType | string) => {
  switch (type) {
    case "$rand.uuid":
      return faker.string.uuid();
    case "$rand.shortId":
      return faker.string.nanoid();
    case "$rand.int":
      return faker.number.int();
    case "$rand.float":
      return faker.number.float();
    case "$rand.hex":
      return faker.number.hex();
    case "$rand.octal":
      return faker.number.octal();
    case "$rand.binary":
      return faker.number.binary();
    case "$rand.romanNumeral":
      return faker.number.romanNumeral();
    case "$rand.bool":
      return faker.datatype.boolean();

    case "$rand.alphaNum":
      return faker.string.alphanumeric();
    case "$rand.word":
      return faker.lorem.word();
    case "$rand.lorem":
      return faker.lorem.paragraph();
    case "$rand.sentence":
      return faker.lorem.sentence();
    case "$rand.string":
      return faker.lorem.text();

    case "$rand.firstName":
      return faker.person.firstName();
    case "$rand.lastName":
      return faker.person.lastName();
    case "$rand.fullName":
      return faker.person.fullName();
    case "$rand.gender":
      return faker.person.sexType();
    case "$rand.email":
      return faker.internet.email();
    case "$rand.phone":
      return faker.phone.number();
    case "$rand.username":
      return faker.internet.username();
    case "$rand.avatar":
      return faker.image.avatar();

    case "$rand.imageUrl":
      return faker.image.url();
    case "$rand.domain":
      return faker.internet.domainName();
    case "$rand.domainSuffix":
      return faker.internet.domainSuffix();
    case "$rand.ip":
      return faker.internet.ip();
    case "$rand.ipv4":
      return faker.internet.ipv4();
    case "$rand.ipv6":
      return faker.internet.ipv6();
    case "$rand.jwt":
      return faker.internet.jwt();
    case "$rand.protocol":
      return faker.internet.protocol();
    case "$rand.port":
      return faker.internet.port();
    case "$rand.password":
      return faker.internet.password();

    case "$rand.city":
      return faker.location.city();
    case "$rand.buildingNumber":
      return faker.location.buildingNumber();
    case "$rand.continent":
      return faker.location.continent();
    case "$rand.country":
      return faker.location.country();
    case "$rand.direction":
      return faker.location.direction();
    case "$rand.language":
      return faker.location.language().name;
    case "$rand.latitude":
      return faker.location.latitude();
    case "$rand.longitude":
      return faker.location.longitude();
    case "$rand.state":
      return faker.location.state();
    case "$rand.street":
      return faker.location.street();
    case "$rand.zipCode":
      return faker.location.zipCode();
    case "$rand.timeZone":
      return faker.location.timeZone();

    case "$rand.anytime":
      return faker.date.anytime();
    case "$rand.futureTime":
      return faker.date.future();
    case "$rand.pastTime":
      return faker.date.past();
    case "$rand.recentTime":
      return faker.date.recent();
    case "$rand.month":
      return faker.date.month();
    case "$rand.weekday":
      return faker.date.weekday();

    case "$rand.color":
      return faker.color.human();
    case "$rand.colorHex":
      return faker.color.rgb();

    default:
      return "";
  }
};
