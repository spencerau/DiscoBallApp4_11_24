import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const result = await sql`CREATE TABLE Responses (
      id SERIAL PRIMARY KEY,
      Question1 INT NOT NULL,
      Question2 INT NOT NULL,
      Question3 INT NOT NULL,
      Question4 INT NOT NULL,
      Question5 INT NOT NULL,
      Question6 INT NOT NULL,
      Question7 INT NOT NULL,
      Question8 INT NOT NULL,
      Question9 INT NOT NULL,
      Question10 INT NOT NULL,
      Question11 INT NOT NULL,
      Question12 INT NOT NULL,
      Question13 INT NOT NULL,
      Question14 INT NOT NULL,
      Question15 INT NOT NULL,
      Question16 INT NOT NULL,
      Question17 INT NOT NULL,
      Question18 INT NOT NULL,
      Question19 INT NOT NULL,
      Question20 INT NOT NULL,
      Question21 INT NOT NULL,
      Question22 INT NOT NULL,
      Question23 INT NOT NULL,
      Question24 INT NOT NULL,
      Question25 INT,
      Question26 INT,
      Question27 INT,
      Question28 INT,
      Question29 INT,
      Question30 INT,
      UserID VARCHAR(50) NOT NULL
    );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
