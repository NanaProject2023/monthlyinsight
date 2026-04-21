Monthly Insight is a full-stack financial tracking application that empowers users to log their daily expenses and profits, from day one to day thirty-one. Each entry includes a date, a title, and a price, and users can toggle between expenses or profits.
Features
	•	Date Selection: Choose any day from one to thirty-one to log financial data.
	•	Title & Price: Each entry has a customizable title and amount.
	•	Expense/Profit Toggle: Easily switch between logging expenses or profits.
	•	Authentication: Secure sign-up and login using JWT (JSON Web Tokens), ensuring user sessions persist.
	•	Session Persistence: Tokens are stored in local storage, so users return where they left off.
	•	Charts: Five dynamic charts visualize weekly expense and profit trends, color-coded in red (negative) or green (positive). The fifth chart aggregates all days, giving a complete monthly overview.
Tech Stack
	•	Frontend: React.js
	•	Backend: Node.js, Express
	•	Database: PostgreSQL (via pg)
	•	Environment Variables: dotenv
	•	Password Security: bcrypt for hashing
	•	API: JWT-based authentication with Bearer tokens in headers.
	•	Session Persistence: User progress is saved in local storage.
Authentication
Upon signing up, users create a secure account with email and password. After login, a JWT token is issued and stored in local storage. Every request includes this token in the Bearer header, ensuring each session is authenticated and secure. Users can pick up exactly where they left off each time they log back in.
Future Plans
We aim to expand Monthly Insight to include more advanced analytics, personalized financial goals, and deeper investment insights.


