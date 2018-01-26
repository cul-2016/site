# siite
The Quodl website - where the latest information on Quodl, the science behind it
and sign up links can be found.

## Set up
1. Clone this repo onto your machine
```
git clone git@github.com:cul-2016/site.git
cd site
```
2. Check you have MongoDB by doing `mongo --version`, otherwise install it. If
you use Homebrew you can do that by doing `brew install mongodb` or if you use
npm you can follow the instructions here: https://www.npmjs.com/package/mongodb.
3. Run `npm install` in your command line
4. Add the environment variable to connect with our hosted database to your `.env`
file. Ask us and we will provide this for you. The project has got a local
database that it can run with if you don't have the `.env` variable but you will
have to start from scratch to fill it with content.
5. Then set the environment variable by doing `source .env` in your command line.
6. Then do `npm start` and go to http://0.0.0.0:3000/
7. To see the admin view go to http://0.0.0.0:3000/login and enter a username and
password (provided by us).
