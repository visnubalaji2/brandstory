Database Setup :
    CREATE TABLE navmenu (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        stylecolor VARCHAR(50),
        submenu TEXT
      );
    
    CREATE TABLE contents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      heading TEXT NOT NULL,
      content TEXT NOT NULL,
      image_src VARCHAR(500)
);

Steps To Run The Project:

BACKEND :
     1) Navigate to the Backend folder -> cd Backend/
     2)npm install
     3) export the environment variables
            DB_HOST=
            DB_USER=
            DB_PASSWORD=
            DB_DATABASE=
     4) npm run dev

FRONTEND:
     1) Navigate to Frontend folder -> cd Frontend/brandstory/
     2) npm install
     3)npm run dev


For admin purpose
Navigate to route /main?role=admin
