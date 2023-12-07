CREATE TABLE users (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Rol_Id INT NOT NULL DEFAULT 0,
  First_names VARCHAR(255) NOT NULL,
  Last_names VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Role VARCHAR(255) NOT NULL ,
  Instagram_Link VARCHAR(255),
  Facebook_Link VARCHAR(255),
  Created_at DATETIME,
  Phone_Number VARCHAR(255) NOT NULL,
  FOREIGN KEY (Rol_Id) REFERENCES roles(Id)
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

-- Aquí se definen las referencias entre tablas
ALTER TABLE posts ADD FOREIGN KEY (tags) REFERENCES tags(id);
ALTER TABLE comments_community ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE comments_community ADD FOREIGN KEY (post_id) REFERENCES posts_community(id);
ALTER TABLE posts_community ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_profile ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_posts ADD FOREIGN KEY (post_id) REFERENCES posts(id);
ALTER TABLE preferences ADD FOREIGN KEY (weather) REFERENCES weather_references(code);
ALTER TABLE pets ADD FOREIGN KEY (owner) REFERENCES users(id);
ALTER TABLE posts ADD FOREIGN KEY (pet) REFERENCES pets(id);
ALTER TABLE preferences ADD FOREIGN KEY (user_Id) REFERENCES users(id);
ALTER TABLE matchs ADD FOREIGN KEY (user) REFERENCES users(id);
ALTER TABLE matchs ADD FOREIGN KEY (pet) REFERENCES pets(id);
