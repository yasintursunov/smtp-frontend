cp .env.local.example .env.local  # edit:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

npm i
npm run dev
# -> http://localhost:3000


Pages:
/login, /register, /forgot-password, /reset-password?token=...
/ — user profile (name, email, status, role)
/admin — admin user table (bulk block/unblock/delete).
Non-admin is redirected away.

Flow:
Register → email with confirm link.
Click confirm → backend logs you in via cookie → redirects to / (user) or /admin (admin).
Forgot password → email with reset link → set new password.