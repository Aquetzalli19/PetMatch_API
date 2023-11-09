-- Crear la tabla roles
CREATE TABLE roles (
  Id INT PRIMARY KEY NOT NULL,
  Name VARCHAR(255) NOT NULL
);

-- Crear la tabla users
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

-- Crear la tabla pets
CREATE TABLE pets (
  Id INT PRIMARY KEY NOT NULL,
  Name VARCHAR(255) NOT NULL,
  Breed VARCHAR(255) NOT NULL,
  Pet_Size VARCHAR(20) NOT NULL,
  Age INT,
  Description TEXT NOT NULL,
  Care_Requirements TEXT NOT NULL,
  Contact_info VARCHAR(255) NOT NULL,
  Owner INT,
  FOREIGN KEY (Owner) REFERENCES users(Id)
);

-- Crear la tabla pet_commentaries
CREATE TABLE pet_commentaries (
  Id INT PRIMARY KEY NOT NULL,
  User_id INT,
  Comment TEXT,
  Date DATE,
  Rating INT,
  FOREIGN KEY (User_id) REFERENCES users(Id)
);

-- Crear la tabla posts
CREATE TABLE posts (
  Id INT PRIMARY KEY NOT NULL,
  Date DATE,
  Pet INT,
  Comments INT,
  FOREIGN KEY (Pet) REFERENCES pets(Id),
  FOREIGN KEY (Comments) REFERENCES pet_commentaries(Id)
);

-- Crear la tabla preferences
CREATE TABLE preferences (
  Id INT PRIMARY KEY NOT NULL,
  User_Id INT,
  Housing_Type ENUM('Pequeno', 'Mediano', 'Grande'),
  Allergies ENUM('Yes', 'No'),
  Exercise_ability ENUM('Poco', 'Moderado', 'Mucho'),
  Category ENUM('Perros', 'Gatos', 'Roedores', 'Aves'),
  Outdoor_Time ENUM('Si', 'No'),
  Weather ENUM('WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'WS6', 'WS7'),
  FOREIGN KEY (User_Id) REFERENCES users(Id)
);

-- Crear la tabla weather_references
CREATE TABLE weather_references (
  Code VARCHAR(5) PRIMARY KEY,
  Description VARCHAR(255)
);

-- Crear la tabla reviews
CREATE TABLE reviews (
  ID INT PRIMARY KEY NOT NULL,
  Post INT,
  Commentaries INT,
  FOREIGN KEY (Post) REFERENCES posts(Id),
  FOREIGN KEY (Commentaries) REFERENCES pet_commentaries(Id)
);

-- Crear la tabla matchs
CREATE TABLE matchs (
  Id INT,
  User INT,
  Pet INT,
  State VARCHAR(255),
  FOREIGN KEY (User) REFERENCES users(Id),
  FOREIGN KEY (Pet) REFERENCES pets(Id)
);
--Debes ejecutar esta db en tu phpMyadmin