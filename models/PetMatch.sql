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
  size INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Table posts_community
CREATE TABLE posts_community (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  Comment TEXT,
  Date DATE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Table comments_community
CREATE TABLE comments_community (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  coment TEXT NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (`post_id`) REFERENCES `posts_community` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);



-- Table pets
CREATE TABLE pets (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  age INT,
  description TEXT NOT NULL,
  owner INT,
  type ENUM('Perros', 'Gatos', 'Roedores', 'Aves'),
  pet_Size ENUM('Pequeno','Mediano','Grande'),
  outdoor_Time ENUM('Si', 'No'),
  allergies  ENUM('Yes', 'No'),
  exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
  weather ENUM('Frio', 'Calor', 'Templado', 'Todos los climas'),
  status VARCHAR(255) DEFAULT 'En adopcion',
  FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
);

-- Table posts
CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE,
  pet INT,
  img INT,
  status INT DEFAULT 0,
  report VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`pet`) REFERENCES `pets` (`id`),
  FOREIGN KEY (`img`) REFERENCES `images_posts` (`id`)
);

-- Table preferences
CREATE TABLE preferences (
  user_Id INT PRIMARY KEY,
  housing_Type ENUM('Pequeno','Mediano','Grande'),
  allergies ENUM('Yes', 'No'),
  exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
  category ENUM('Perros', 'Gatos', 'Roedores', 'Aves'),
  outdoor_Time ENUM('Si', 'No'),
  weather ENUM('Frio', 'Calor', 'Templado', 'Todos los climas'),
  FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`)
);
