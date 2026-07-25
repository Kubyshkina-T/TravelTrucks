# TravelTrucks

TravelTrucks is a camper rental web application that allows users to browse available campers, filter them by selected parameters, view detailed information, check reviews, browse photos, and send a booking request.

## Main Features

- Home page with a hero section
- Camper catalog page
- Filtering campers by location, form, engine type, and transmission
- Load more functionality
- Empty state for no matching campers
- Camper details page
- Image gallery with Swiper
- Reviews section
- Booking form
- Form validation with Yup
- Success and error notifications with React Hot Toast
- Custom loading page

## Technologies Used

- Next.js
- React
- TypeScript
- CSS Modules
- Axios
- Yup
- React Hot Toast
- Swiper
- React Icons
- Next Image
  
## API

The project uses the backend API:

https://campers-api.goit.study

Main endpoints:

GET /campers
GET /campers/{camperId}
GET /campers/{camperId}/reviews
POST /campers/{camperId}/booking-requests

### Installation

Clone the repository:

git clone https://github.com/Kubyshkina-T/TravelTrucks

## Go to the project folder:

cd travel-trucks

## Install dependencies:

npm install

Usage

## Run the development server:

npm run dev

## Open the project in your browser:

http://localhost:3000

Users can open the catalog page, select filters, browse camper cards, open a detailed camper page, view photos and reviews, and send a booking request using the booking form.

After successful form submission, the user receives a success notification.

## Build

To create a production build:

npm run build

## To start the production server:

npm start

## Author

Created by Tetiana Kubyshkina.
