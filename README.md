===📦 Tech Stack===
Next.js 14 (App Router)
Prisma ORM
PostgreSQL (via Docker)
MUI (Material UI)
Zod for validation

===🚀 Setup & Run with Docker===
1.pull code from develop branch

2.Create .env file
#DATABASE_URL="postgresql://postgres:postgres@db:5432/noted_db"
#API_SECRET="fortestapikey123"

3.Run with Docker
#RUN Docker 
docker-compose up --build       
#Migrate db
docker-compose exec web npx prisma db push    
#Seed Example data
docker-compose exec web npx tsx prisma/seed.ts
