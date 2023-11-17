CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  rol ENUM('0', '1') DEFAULT '0',
  first_names VARCHAR(255) NOT NULL,
  last_names VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  addres VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  instagram_Link VARCHAR(255),
  facebook_Link VARCHAR(255),
  created_at DATETIME,
  phone_Number VARCHAR(255) NOT NULL
);

CREATE TABLE pets (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  pet_Size VARCHAR(20) NOT NULL,
  age INT,
  description TEXT NOT NULL,
  care_Requirements TEXT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  owner INT,
  status VARCHAR(255)
);

CREATE TABLE images_posts (
  id INT PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  mimetype VARCHAR(255) NOT NULL,
  size INT NOT NULL
);

CREATE TABLE images_profile (
  id INT PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  mimetype VARCHAR(255) NOT NULL,
  size INT NOT NULL
);

CREATE TABLE posts_community (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  Comment TEXT,
  Date DATE
);

CREATE TABLE comments_community (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  coment TEXT NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE,
  pet INT,
  img INT,
  comments INT,
  tags INT
);

CREATE TABLE preferences (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_Id INT,
  housing_Type ENUM('Pequeno','Mediano','Grande'),
  allergies ENUM('Yes', 'No'),
  exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
  category ENUM('Perros', 'Gatos', 'Roedores', 'Aves'),
  outdoor_Time ENUM('Si', 'No'),
  weather ENUM('WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'WS6', 'WS7')
);

CREATE TABLE weather_references (
  code VARCHAR(5) PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE matchs (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user INT,
  pet INT,
  state VARCHAR(255)
);

CREATE TABLE tags (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name_tag VARCHAR(255)
);

ALTER TABLE posts ADD CONSTRAINT fk_tags FOREIGN KEY (tags) REFERENCES tags(id);
ALTER TABLE comments_community ADD CONSTRAINT fk_user_comments FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE comments_community ADD CONSTRAINT fk_post_comments FOREIGN KEY (post_id) REFERENCES posts_community(id);
ALTER TABLE posts_community ADD CONSTRAINT fk_user_posts_community FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_profile ADD CONSTRAINT fk_user_images_profile FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_posts ADD CONSTRAINT fk_post_images_posts FOREIGN KEY (post_id) REFERENCES posts(id);
ALTER TABLE preferences ADD CONSTRAINT fk_user_preferences FOREIGN KEY (user_Id) REFERENCES users(id);
ALTER TABLE pets ADD CONSTRAINT fk_owner_pets FOREIGN KEY (owner) REFERENCES users(id);
ALTER TABLE posts ADD CONSTRAINT fk_pet_posts FOREIGN KEY (pet) REFERENCES pets(id);
ALTER TABLE preferences ADD CONSTRAINT fk_weather_preferences FOREIGN KEY (weather) REFERENCES weather_references(code);
ALTER TABLE matchs ADD CONSTRAINT fk_user_matchs FOREIGN KEY (user) REFERENCES users(id);
ALTER TABLE matchs ADD CONSTRAINT fk_pet_matchs FOREIGN KEY (pet) REFERENCES pets(id);
