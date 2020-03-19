echo "export PORT=8081" >> ../.env
echo "export AUTH_SECRET=$AUTH_SECRET" >> ../.env

echo "export AWS_ACCESS_SECRET=$AWS_ACCESS_SECRET" >> ../.env
echo "export AWS_ACCESS_KEY=$AWS_ACCESS_KEY" >> ../.env
echo "export AWS_ACCESS_BUCKET=$AWS_ACCESS_BUCKET" >> ../.env
echo "export AWS_ACCESS_REGION=$AWS_ACCESS_REGION" >> ../.env

echo "export SPARK_POST=$SPARK_POST" >> ../.env

echo "export NODE_ENV=development" >> ../.env

echo "export DB_HOST=$DB_HOST" >> ../.env
echo "export DB_PORT=$5432" >> ../.envs
echo "export DB_USERNAME=$DB_USERNAME" >> ../.env
echo "export DB_PASSWORD=$DB_PASSWORD" >> ../.env
echo "export DB_NAME=$DB_NAME" >> ../.env
