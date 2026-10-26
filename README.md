# Ghuri — Bangladesh Tourism & Travel Companion

**Ghuri** is a tourism-focused mobile application designed to help users explore Bangladesh, discover tourist destinations, learn about local attractions, compare accommodation options, find tour guides, and organize travel plans through a single platform.

The application brings together destination information, travel-related services, local insights, and trip-management functionality in an intuitive mobile interface. It is designed around Bangladesh's cultural heritage, natural landscapes, historical landmarks, beaches, hills, rivers, and other tourism destinations.

Ghuri combines mobile application development with structured tourism data, user authentication, bilingual content support, and travel-related workflows to create a more organized and accessible travel-planning experience.

## Key Features

### 1. Tourist Destination Discovery
- Explore tourist destinations across Bangladesh's eight administrative divisions.
- Browse destinations by categories such as historical sites, natural attractions, beaches, hills, rivers, religious sites, wildlife, and urban attractions.
- View destination descriptions, historical information, photographs, ratings, and reviews.
- Access information about opening hours, entrance fees, recommended visiting seasons, and estimated visit duration.

### 2. Local Travel Information
- Explore available transportation options for destinations.
- View estimated travel times and transportation fare ranges.
- Discover nearby hotels, local food options, and relevant amenities.
- Access destination-specific safety tips and fair-price guidance.

### 3. Hotel and Accommodation Discovery
- Browse hotel and accommodation information.
- View hotel photographs, descriptions, amenities, ratings, and review counts.
- Explore accommodation pricing and destination-related information.
- Review listed availability information when planning a stay.

### 4. Tour Guide and Travel Agency Information
- Explore tour guide profiles and travel service providers.
- Review guide experience, languages, specializations, biographies, ratings, and pricing information.
- Discover travel agencies associated with different regions and destinations.
- Access information about tour services and available travel assistance.

### 5. Trip Planning and Booking Management
- Organize travel-related information through trip-planning workflows.
- Manage travel-related records, including trip, hotel, guide, and destination-related entries.
- Track trip-related statuses and relevant booking information where supported by the application.
- Keep travel information organized within the application.

### 6. Nearby Attractions and Local Experiences
- Discover attractions around selected destinations.
- Explore recommended places, estimated travel times, local transportation options, and approximate travel costs.
- Learn about local food, suggested visit durations, and the best times to visit different attractions.

### 7. Bengali and English Language Support
- Provide localized content for Bengali-speaking and English-speaking users.
- Translate destination names, categories, regional information, and other supported content.
- Improve accessibility for users who prefer either language.

### 8. User Authentication and Profile Management
- Support user registration and login functionality.
- Implement authentication-state handling and session persistence.
- Maintain user profile information, including contact details and membership information.
- Support Firebase Authentication and a local persistence-based fallback implementation, depending on the application's configuration.

### 9. Tourist Complaint Management
- Include a structured workflow for submitting tourism-related complaints.
- Support complaint information such as the tourist location, contact details, description, and associated images.
- Represent complaint statuses such as pending, under review, and resolved within the application's data model.

### 10. Document Export and Sharing
- Include Expo-based printing and sharing integrations for supported application workflows.
- Use native mobile capabilities to facilitate document generation and sharing where implemented.

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Main programming language for application logic and type definitions |
| React Native | Cross-platform mobile user interface |
| Expo | Mobile development tooling and native feature integrations |
| React | Component-based UI development |
| Firebase Authentication | User registration, login, and authentication-state management |
| Cloud Firestore | Cloud-based user profile and document data support |
| AsyncStorage | Local persistence and offline/mock authentication storage |
| Node.js | JavaScript runtime for server-side tooling |
| Express.js | Server-side application and API framework |
| Drizzle ORM | Database query and schema management |
| Neon Serverless | Serverless PostgreSQL database connectivity |
| Zod | Data validation and schema definition |
| Vite | Development server and build tooling |
| Vitest | Testing framework configured in the project |
| Git & GitHub | Source control and project hosting |

*Note: The repository includes these technologies as dependencies or source-code integrations. Their presence does not necessarily mean every component is fully configured or actively used in production.*

## Technical Implementation

### Mobile Application Architecture
The application uses React Native and TypeScript to organize screens, interface components, application state, and tourism-related data. Expo provides the development environment and integrations for supported native capabilities.

### Data Management
Tourism information is represented through structured TypeScript interfaces and datasets. These cover destinations, categories, hotels, tour guides, transportation options, attractions, and related travel information.

### Authentication and Persistence
The Firebase integration supports email-and-password authentication and user profile documents in Cloud Firestore. AsyncStorage is also used for local persistence, including a mock authentication implementation when valid Firebase configuration is unavailable.

### Backend and Database Tooling
The repository includes Express.js server dependencies, Drizzle ORM, and Neon Serverless connectivity for PostgreSQL-related functionality. Actual database connectivity and deployment depend on the project's environment configuration.

### Localization
Shared localization utilities provide translations for supported destination information, categories, regional content, and other application text.

## Project Structure

The repository contains the following key files and directories:

| File / Directory | Purpose |
|---|---|
| `App.tsx` | Main mobile application interface and application workflows |
| `firebase.ts` | Firebase authentication, user profile operations, and local fallback logic |
| `shared/data.ts` | Structured tourism datasets and TypeScript interfaces |
| `shared/localization` | Localization utilities and translation logic |
| `backend/` | Backend-related project code |
| `server/` | Server-side application code |
| `drizzle/` | Database schema and migration-related files |
| `netlify/functions/` | Netlify serverless function code |
| `scripts/` | Development, build, and database-related scripts |
| `public/` | Public application assets |
| `package.json` | Project dependencies and development scripts |

## Getting Started

### Prerequisites

- Node.js
- pnpm package manager
- Expo-compatible development environment
- Firebase project credentials, if using cloud authentication
- Appropriate database configuration, if using the PostgreSQL-backed functionality

### Installation

Clone the repository:

```bash
git clone https://github.com/Sadit001/Ghuri.git
cd Ghuri
```

Install dependencies:

```bash
pnpm install
```

Configure the required environment variables for Firebase and any database-backed services before running the application.

Start the Expo development server:

```bash
pnpm mobile
```

For a tunnel-based Expo session:

```bash
pnpm mobile:tunnel
```

The exact setup requirements may vary depending on the target platform and which backend services are enabled.

## Learning Outcomes and Technical Scope

Ghuri brings together several areas of software development:

- Cross-platform mobile application development
- TypeScript-based programming and type-safe data structures
- Component-based user interface implementation
- Authentication and user profile management
- Local data persistence and cloud service integration
- Structured data modelling for tourism information
- Localization and bilingual application content
- Backend and relational database tooling
- Mobile printing, image selection, and sharing integrations
- Source control and project organization

## Project Repository

**GitHub:** https://github.com/Sadit001/Ghuri

**Project Type:** Tourism and Travel Mobile Application

**Primary Technologies:** TypeScript, React Native, Expo, Firebase

**Backend and Database Tooling:** Express.js, Drizzle ORM, Neon Serverless PostgreSQL

---

*Ghuri is a software development project focused on making tourism information and travel-related planning more accessible through a unified mobile application experience.*
