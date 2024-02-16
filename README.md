# Rick and Morty API Challenge - Next.js Project

Welcome to my Rick and Morty API Challenge project! This Next.js application is designed to explore the fascinating universe of Rick and Morty, allowing users to fetch and interact with data about locations and residents from the show. Here's an overview of the project, its structure, and some of its key features.

## Project Structure

The project is thoughtfully organized into several directories to maintain a clean and efficient codebase:

- **`/components`**: Contains all the project components, further split into:
  - **`/pages`**: Components that correspond to different pages of the application (Home, Locations, and Residents).
  - **`/includes`**: Shared components like `NavBar` that are used across different pages.
- **`/api`**: Houses the API routes used to post and fetch residents' data from the backend.
- **`/lib`**: Includes utility functions, notably `data.ts`, which contains functions to fetch and process data from the Rick and Morty API endpoint.

### Parallel Processing with Promise.all

In the `data.ts` file within the `/lib` folder, I've utilized parallel processing techniques, notably `Promise.all`, to fetch data from the Rick and Morty API. This approach enables the efficient handling of multiple asynchronous requests simultaneously, significantly reducing the overall data retrieval time and enhancing the user experience.

### REST for Data Fetching

For data fetching from the Rick and Morty API endpoint, I've chosen to use RESTful architecture. This decision was driven by the simplicity, statelessness, and widespread adoption of REST, making it an ideal choice for interfacing with public APIs. It ensures seamless integration and scalability for future enhancements.

## Key Technologies

- **Tailwind CSS**: This project uses Tailwind CSS for styling. The utility-first framework provides the flexibility and efficiency needed for creating custom designs quickly and with less code.
- **Vercel Postgres**: For the backend, Vercel Postgres is utilized to store and manage data. This managed database solution offers scalability, security, and ease of use, which are crucial for modern web applications.
- **TypeScript**: TypeScript is used throughout the project to add type safety and enhance the development experience. It helps in catching errors early and ensures more robust and maintainable code.

## Configuration and Deployment

### Vercel PostgreSQL Database

Users are required to configure a Vercel PostgreSQL database to store and manage the residents' data. The necessary configuration values are provided in the `example.env` file. Please refer to the [Vercel PostgreSQL documentation](https://vercel.com/docs/concepts/next.js/overview) for detailed setup instructions.

**Note**: It's essential to rename `example.env` to `.env.local` and fill in the database connection details to ensure the application functions correctly.

### Advantages of Using Vercel PostgreSQL over Local Storage

Choosing Vercel PostgreSQL for data storage over local storage offers several benefits, including:

- **Scalability**: Easily scales with your application's growing data needs without managing database infrastructure.
- **Accessibility**: Provides centralized access to data from any location, ensuring consistent data availability across different deployments.
- **Security**: Offers robust security features to protect sensitive data, compared to the inherent vulnerabilities with client-side local storage.
- **Performance**: Delivers superior performance with optimized data retrieval and management capabilities.

## Deployment

The application is deployed on Vercel, leveraging its seamless integration with Next.js projects for effortless deployment and high performance. Deploying on Vercel offers advantages such as automatic HTTPS, global CDN, and instant cache invalidation, ensuring an optimal user experience.

Check out the live application here: [Rick and Morty API Challenge](https://rick-and-morty-api-challenge.vercel.app/)

## Getting Started

To run the project locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/kamula/rick_and_morty-API-Challenge.git
cd rick_and_morty-API-Challenge
npm install
```

Next, configure your `.env.local` file according to the `example.env` template with your Vercel PostgreSQL credentials.

Finally, run the development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the application.

## Conclusion

This Rick and Morty API Challenge project showcases the capabilities of Next.js combined with the power of parallel data processing and RESTful services. By leveraging Vercel PostgreSQL for data management, the application is well-positioned for scalability, performance, and security. Explore the wondrous universe of Rick and Morty with this interactive and engaging application!

