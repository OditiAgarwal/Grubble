# Grubble
Project Description 📝
This platform helps students and professionals navigate their career paths by offering AI-driven personalized roadmaps, skill development courses, and job opportunities. It integrates course data from platforms like Udemy and Coursera, provides career counseling, and offers recruiter access for hiring. With features like AI-powered guidance, skill tracking, and a recommendation system, it aims to bridge the gap between education and employment.

### Architecture Diagram 🏗️

Here is a high-level diagram that illustrates the architecture of the Grubble ed-tech platform:
![Architecture Diagram](https://github.com/user-attachments/assets/16bb7572-1479-4bb7-908c-fd839cdeedad)


### System Architecture
The career guidance and learning platform consists of three main components: the frontend, backend, and database. The platform follows a client-server architecture, where the frontend acts as the client, while the backend and database function as the server.

🎨 Frontend
The frontend is built using React Native, a powerful framework for developing cross-platform mobile applications. It utilizes Tailwind CSS/NativeBase for a responsive and visually appealing UI, ensuring an intuitive experience for students and professionals. Redux/Zustand is used for efficient state management, enabling seamless interactions. The frontend communicates with the backend through RESTful API calls.

⚙️ Backend
The backend is developed using Node.js and Express.js, which provide a robust and scalable server-side architecture. It handles user authentication, course recommendations, career roadmap generation, recruiter access, and more. Additionally, an AI-driven roadmap generator powered by FastAPI (Python) personalizes learning paths based on user inputs. The backend efficiently processes and manages user data, learning progress, and payment transactions.

🛢️ Database
The platform integrates PostgreSQL for structured data storage, ensuring reliable and relational data management. MongoDB is used for storing certificates, learning progress, and other flexible data types. Redis is incorporated for caching, optimizing performance and reducing load times. Additionally, AWS S3/Firebase Storage is used for handling media files, such as certificates and course resources.

This architecture ensures a seamless, scalable, and efficient system that helps users make informed career choices and upskill effectively.

### Schema 
![image](https://github.com/user-attachments/assets/ce8cf23b-b6a0-4ad2-bc02-6c659fce969e)

