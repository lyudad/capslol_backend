import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Seeding1650471994981 implements MigrationInterface {
  name = 'Seeding1650471994981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // seeding users
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Jabez', 'Braitling', 'jbraitling0@delicious.com', false, 'OuFAYnIQCDZ41Qrd', '86(965)720-4444', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Ines', 'Mableson', 'imableson1@live.com', false, 'FUpsuL21Qrd', '46(104)384-4701', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Joelle', 'Musselwhite', 'jmusselwhite2@senate.gov', false, 'd8Yo271Bt6q1Qrd', '63(871)973-6357', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Eba', 'Note', 'enote3@mayoclinic.com', false, 'pITrF2VzS1Qrd', '57(378)499-5908', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Mathe', 'Eliot', 'meliot4@booking.com', false, 'yIbBn71Qrd', '86(530)233-8961', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Corney', 'Venditti', 'cvenditti5@icio.us', false, 'Ja5MnDKErCrk1Qrd', '355(612)898-3453', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Harwell', 'Ackrill', 'hackrill6@plala.or.jp', false, 'IYUB1yh1Qrd', '86(667)959-3808', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Stanwood', 'Jakuszewski', 'sjakuszewski7@bbb.org', false, '3Lxb3qho2x1Qrd', '55(994)465-7670', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Yolanthe', 'Minichi', 'yminichi8@cdc.gov', false, 'Q7c4cDLEE1Qrd', '58(698)399-3767', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Micheline', 'Treharne', 'mtreharne9@answers.com', false, 'PvQR603EKXrk1Qrd', '7(884)459-8598', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Myrwyn', 'Thring', 'mthringa@cdc.gov', false, 'nxIgp9fL1Qrd', '55(568)636-8547', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Glori', 'Cory', 'gcoryb@goo.ne.jp', false, 'frZbGo1Qrd', '84(395)442-1124', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Jamal', 'Glowinski', 'jglowinskic@deliciousdays.com', false, 'W0pLEtI5WL1Qrd', '54(442)865-3501', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Elvis', 'Lambertazzi', 'elambertazzid@earthlink.net', false, 'KDMKUOlAG1Qrd', '62(739)999-8435', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Antin', 'Stebbin', 'astebbine@bizjournals.com', false, 'KfyyAM3I1Qrd', '31(126)984-9856', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Candy', 'Kiefer', 'ckieferf@pcworld.com', false, 'vUFEnrb1Qrd', '63(865)185-8830', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Evangeline', 'Rubinovitch', 'erubinovitchg@feedburner.com', false, 'i6rsRxF1Qrd', '86(917)486-3423', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Florri', 'Kohn', 'fkohnh@marketwatch.com', false, 'CP57UYYr3Q1Qrd', '62(244)131-3923', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Aurilia', 'Jeavon', 'ajeavoni@dmoz.org', false, '8Kyxw71Qrd', '353(200)442-3696', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Maribel', 'McCart', 'mmccartj@discovery.com', false, 'WQfmK0toob1Qrd', '358(910)981-7371', 'Freelancer');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Andrea', 'Cooper', 'acooperk@pcworld.com', false, 'll00Nkwge1Qrd', '880(343)711-9098', 'Job Owner');`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, email, isGoogle, password, phoneNumber, role) VALUES ('Rayshell', 'Finlason', 'rfinlasonl@wikipedia.org', false, 'C1Dqdo1Qrd', '355(548)217-8331', 'Job Owner');`,
    );

    // seeding skiils
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('Photoshop');`);
    await queryRunner.query(
      `INSERT INTO skills (name) VALUES ('Google Analytics');`,
    );
    await queryRunner.query(
      `INSERT INTO skills (name) VALUES ('Yandex Metrics');`,
    );
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('Figma');`);
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('Flask');`);
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('Typescript');`);
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('Docker');`);
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('CI/CD');`);
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('SolidJS');`);
    await queryRunner.query(`INSERT INTO skills (name) VALUES ('SQL');`);

    // seeding categories
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Research and Development');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Web development');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Marketing');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Accounting');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Business Development');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Human Resources');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('UX/UI design');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Data scientist');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Services');`,
    );
    await queryRunner.query(
      `INSERT INTO categories (categoryName) VALUES ('Legal');`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
