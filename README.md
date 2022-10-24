
# Seattle Late School Buses Project

I was inspired to work on this project by the understanding that student achievement is negatively affected by tardiness. I started this project in Jupyter notebooks while teaching high school data science in 2019. I recently implemented an API in Flask, and this web application in React.

In this project my software builds a database of daily late buses with key information such as school, route, date, and minutes late. This information is available publicly on a per-day basis, but no historical database or public APIs exist. My project uses a Flask app to scrape the Seattle Schools webpage, parse it using regex, and post the data to PostgresQL. The post request is triggered from a cron job on BEEW.io and the back-end service is deployed to Heroku. The front-end web application is React with MapBoxGL and is deployed to GitHub pages.

Here is a link to the Flask API repo: [https://github.com/beccaelenzil/seattle-late-schools-buses](https://github.com/beccaelenzil/seattle-late-schools-buses)

The deployed React Web Application can be viewed here: [https://beccaelenzil.github.io/buses-react/](https://beccaelenzil.github.io/buses-react/)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
