# Six Cities

## 📖 About the Project

**Six Cities** is a comprehensive React-based web application developed as a training project during my studies at [HTML Academy](https://htmlacademy.ru/intensive/react). This project demonstrates proficiency in modern React development, state management, routing, and integration with external APIs.

The application simulates a rental housing service for travelers, offering a seamless experience for browsing accommodations across six popular European cities.

## 🌟 Key Features

### Core Functionality

- **Multi-city Browse**: Explore rental offers in 6 European cities (Paris, Cologne, Brussels, Amsterdam, Hamburg, Düsseldorf)
- **Interactive Maps**: Powered by Leaflet with dynamic markers and hover effects
- **User Authentication**: Secure login system with route protection
- **Favorites System**: Save and organize preferred accommodations
- **Reviews & Ratings**: View and submit property reviews
- **Advanced Sorting**: Sort offers by popularity, price, and rating

## 🛠 Technology Stack

### Frontend Framework & Libraries

- **React 18** - Component-based UI framework for building the SPA
- **Redux** - Application state management
- **Redux Thunk** - Middleware for handling async actions and API calls
- **React Router DOM** - Declarative routing for single page navigation

### Mapping & Visualization

- **Leaflet** - Interactive maps with dynamic markers and hover effects

### HTTP & Data Management

- **Axios** - Promise-based HTTP client for API integration

### Development & Testing Tools

- **Webpack** - Module bundler with modern build process
- **Jest** - JavaScript testing framework for unit and integration tests
- **Testing Library** - Testing utilities for React components
- **ESLint** - Code linting tool ensuring code quality and consistency

## 📱 Application Structure

### Pages & Routes

| Route         | Component | Access      | Description                                |
| ------------- | --------- | ----------- | ------------------------------------------ |
| `/`           | Main      | Public      | City selection and offers listing with map |
| `/city/:city` | City      | Public      | City-specific offers and map view          |
| `/login`      | Sign In   | Public only | User authentication                        |
| `/favorites`  | Favorites | Private     | User's saved accommodations                |
| `/offer/:id`  | Property  | Public      | Detailed property information              |
| `/error`      | Error     | Public      | Application error page                     |
| `*`           | 404       | Public      | Error handling for invalid routes          |

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x
- npm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ElizabethSh/1061045-six-cities-6.git
   cd six-cities
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:1337`

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run all tests
npm run eslint     # Run code linting
```

## 🎨 User Experience Features

### Interactive Elements

- **Dynamic city switching** with smooth transitions
- **Map interactions** with marker hover effects
- **Real-time favorites** toggle functionality
- **Form validation** with user feedback
- **Loading states** and error handling

## 🧪 Testing Strategy

The project includes comprehensive testing coverage:

- **Component Testing**: Individual component behavior
- **Integration Testing**: Component interactions
- **Redux Testing**: Actions, reducers, and selectors
- **Routing Testing**: Navigation and route protection
- **API Testing**: Mocked HTTP requests

## 🎓 Academic Recognition

This project was completed as part of the intensive React course at HTML Academy, one of Russia's leading web development education platforms. The project showcases practical application of modern React development principles and best practices taught in the course.

## 📄 License

This project was created for educational purposes as part of the HTML Academy React course.

---

<a href="https://htmlacademy.ru/intensive/react">
  <img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/react/logo-for-github.png">
</a>

**Developed with ❤️ during React training at HTML Academy**

[travis-image]: https://travis-ci.com/htmlacademy-react/1061045-six-cities-6.svg?branch=master
[travis-url]: https://travis-ci.com/htmlacademy-react/1061045-six-cities-6
