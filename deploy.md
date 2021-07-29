To deploy:

    heroku login
    git push heroku main
    

Migrate production db:
    
    heroku run npm run sequelize db:migrate


Seed production db

    heroku run npm run sequelize db:seed:all


Heroku terminal:

    heroku run bash
    
    npm run sequelize db:seed:undo:all
    npm run sequelize db:migrate:undo:all   


For Application Error:
    
    heroku logs


Continuosly output logs to terminal
    
    heroku logs --tail
