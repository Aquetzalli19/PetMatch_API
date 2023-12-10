-- Table users
CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  rol ENUM('0', '1') DEFAULT '0',
  first_names VARCHAR(255) NOT NULL,
  last_names VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  instagram_Link VARCHAR(255),
  facebook_Link VARCHAR(255),
  created_at DATETIME,
  phone_Number VARCHAR(255) NOT NULL
);

-- Table pets
CREATE TABLE pets (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  pet_Size VARCHAR(20) NOT NULL,
  age INT,
  description TEXT NOT NULL,
  owner INT,
  allergies VARCHAR(255),
  exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
  status VARCHAR(255),
  report varchar(255) DEFAULT Null
);

-- Table images_posts
CREATE TABLE images_posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  mimetype VARCHAR(255) NOT NULL,
  size INT NOT NULL
);

-- Table images_profile
CREATE TABLE images_profile (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  mimetype VARCHAR(255) NOT NULL,
  size INT NOT NULL
);

-- Table posts_community
CREATE TABLE posts_community (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  Comment TEXT,
  Date DATE
);

-- Table comments_community
CREATE TABLE comments_community (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  coment TEXT NOT NULL,
  date DATE NOT NULL
);

-- Table posts
CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE,
  pet INT,
  img INT,
  status INT DEFAULT 0
);

-- Table preferences
CREATE TABLE preferences (
  user_Id INT,
  housing_Type ENUM('Pequeno','Mediano','Grande'),
  allergies ENUM('Yes', 'No'),
  exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
  category ENUM('Perros', 'Gatos', 'Roedores', 'Aves'),
  outdoor_Time ENUM('Si', 'No'),
  weather ENUM('Frio', 'Calor', 'Templado', 'Todos los climas')
);

-- Referencias
ALTER TABLE comments_community ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE comments_community ADD FOREIGN KEY (post_id) REFERENCES posts_community(id);
ALTER TABLE posts_community ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_profile ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE images_posts ADD FOREIGN KEY (id) REFERENCES posts(img);
ALTER TABLE pets ADD FOREIGN KEY (owner) REFERENCES users(id);
ALTER TABLE posts ADD FOREIGN KEY (pet) REFERENCES pets(id);
ALTER TABLE preferences ADD FOREIGN KEY (user_Id) REFERENCES users(id);
