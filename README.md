# Strict Transport Security example on heroku

The following exercise shows a practical example of using HTTP Strict Transport Security (HSTS),
as a browser security control to allow only HTTPS-enabled resources to be fetched from
the primary domain for a website.

### Requirements

We will be using [Heroku](https://www.heroku.com/) as our hosting platform for an Express Node.js application, as we will need both an HTTPS enabled hosting, as well as an HTTP hosting to switch on and off the HTTP Strict Transport Security header.

## Source code

Obtain the source code from the official GitHub repository at: https://github.com/lirantal/nodejssecurity-headers-hsts.

Once you cloned the repository, the overall projects file structure that you should be aware of is:

1. An express server in `server.js`
2. A handlebars template in `views/home.handlebars` which serves an example website
3. A `public` directory which has an image that we will use

## Deployment

You'll need an Heroku account to deploy the Express web app there.

1. Sign-up for a free Heroku account, and have the `heroku` CLI installed.
2. `npm install` all the dependencies in the project.
3. Create a Heroku Node.js project
4. Login from the CLI using: `heroku login` 5. Using the `heroku` CLI create a new project, such as: `heroku git:remote -a hsts-express-example` to instantiate a git remote for the project, assuming `hsts-express-example` is the name of the heroku project name you used in step (3).
6. Deploy the app using `git push heroku master`

At this point, it should be available as both HTTPS and HTTP endpoints, such as:
* https://hsts-express-example.herokuapp.com/
* http://hsts-express-example.herokuapp.com/

## Exercise 1

Once the Express app is deployed, try to access it: `https://hsts-express-example.herokuapp.com/`

- Look at the network tab in the browser's DevTools
- What did you find?

You should notice a few of things happening:
- The main request to the page `https://hsts-express-example.herokuapp.com/` replies back with a `Strict-Transport-Security` security header.
- The request to load the image `http://hsts-express-example.herokuapp.com/harley-davidson-zGzXsJUBQfs-unsplash.jpg` gets an internal browser redirect to its HTTPS version because the HSTS version does just that - it upgrades all requests to their HTTPS counterpart to load them securely.
- The favicon from `http://http.rip/favicon.ico` is blocked from being loaded.

## Exercise 2

Update the expiration time of the HSTS setting to 0, what happens then?

```js
httpApp.use(
  helmet.hsts({
    maxAge: 0,
  })
);
```

What changed in contrast to exercise 1 before?

- `Strict-Transport-Security` is set, but with an expiration time of 0, which disables it.
- The unsplash image is loaded from HTTP directly, without any redirect
- The favicon is fetched and displayed for the website