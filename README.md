How to Run the Project
Run on Local Machine

npm install              # Install all packages    
npx prisma db push       # Setup the database schema
npm run dev              # Start development server (http://localhost:3000)

#Please run PostgreSQL and .env 

Run with Docker
docker-compose up --build       #Start Next.js + PostgreSQL
docker-compose exex web npx prisma db push      #  Apply schema inside container