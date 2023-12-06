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
  tipe VARCHAR(255) NOT NULL,
  pet_Size VARCHAR(20) NOT NULL,
  age INT,
  description TEXT NOT NULL,
  owner INT,
  allergies VARCHAR(255),
  exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
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
  weather ENUM('Frio', 'Calor', 'Templado', 'Todos los climas')
);

CREATE TABLE matchs (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user INT,
  pet INT,
  state VARCHAR(255)
);

CREATE TABLE tags (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name_tag VARCHAR(255),
  post INT
);

ALTER TABLE tags ADD CONSTRAINT fk_tags_posts FOREIGN KEY (post) REFERENCES posts(id);
ALTER TABLE comments_community ADD CONSTRAINT fk_comments_community_users FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE comments_community ADD CONSTRAINT fk_comments_community_posts_community FOREIGN KEY (post_id) REFERENCES posts_community(id);
ALTER TABLE posts_community ADD CONSTRAINT fk_posts_community_users FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_profile ADD CONSTRAINT fk_images_profile_users FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_posts ADD CONSTRAINT fk_images_posts_posts FOREIGN KEY (post_id) REFERENCES posts(id);
ALTER TABLE pets ADD CONSTRAINT fk_pets_users FOREIGN KEY (owner) REFERENCES users(id);
ALTER TABLE posts ADD CONSTRAINT fk_posts_pets FOREIGN KEY (pet) REFERENCES pets(id);
ALTER TABLE preferences ADD CONSTRAINT fk_preferences_users FOREIGN KEY (user_Id) REFERENCES users(id);
ALTER TABLE matchs ADD CONSTRAINT fk_matchs_users FOREIGN KEY (user) REFERENCES users(id);
ALTER TABLE matchs ADD CONSTRAINT fk_matchs_pets FOREIGN KEY (pet) REFERENCES pets(id);
