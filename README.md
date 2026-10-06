# PlateLog — Daily Nutrition & Meal Tracker

PlateLog is a modern, responsive React web application designed to help users track daily food intake, monitor calorie and macronutrient consumption, search food items using the official USDA database, and review historical logs over time.

## Features
- **Daily Food Logging:** Add custom food entries with calorie and macro breakdowns (protein, carbs, fat).
- **USDA Database Integration:** Real-time search powered by the USDA FoodData Central API.
- **Interactive Filtering:** Filter meals by categories (Breakfast, Lunch, Dinner, Snack) or navigate across different dates.
- **Daily Macro Summary:** Auto-calculates total calories and macronutrients for selected days.
- **History View:** Complete chronological view of past food logs.
- **Local Persistence:** Retains entries locally using browser \localStorage\.

## Technologies Used
- **React 19**
- **Vite**
- **React Router**
- **USDA FoodData Central API**
- **CSS3 (Custom Variables, Flexbox & Grid)**

## Getting Started Locally

1. **Clone the repository:**
   \\\ash
   git clone https://github.com/petertorres232-byte/platelog.git
   cd platelog
   \\\

2. **Install dependencies:**
   \\\ash
   npm install
   \\\

3. **Set up environment variables:**
   Create a \.env\ file in the project root and add your USDA API key:
   \\\env
   VITE_USDA_API_KEY=your_usda_api_key_here
   \\\

4. **Run the development server:**
   \\\ash
   npm run dev
   \\\

## Author
Built by **Peter Torres**.
