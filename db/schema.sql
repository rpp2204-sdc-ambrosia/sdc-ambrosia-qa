
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name varchar(40),
  slogan varchar(255),
  product_description text,
  category varchar(30),
  default_price int
);

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  product_id int NOT NULL,
  question_body text NOT NULL,
  question_date bigint NOT NULL,
  asker_name varchar(80) NOT NULL,
  asker_email varchar(80) NOT NULL,
  reported boolean,
  question_helpfulness INT,
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  question_id int NOT NULL,
  answer_body text NOT NULL,
  answer_date bigint NOT NULL,
  answer_name varchar(80) NOT NULL,
  answer_email varchar(80) NOT NULL,
  reported boolean,
  answer_helpfulness INT,
  FOREIGN KEY (question_id) REFERENCES questions (question_id)
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id int NOT NULL,
  photo_url varchar,
  FOREIGN KEY (answer_id) REFERENCES answers (answer_id)
);