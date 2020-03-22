#!/bin/bash -eo pipefail
# sudo yarn install

DEPLOY_APPICATION=girbil
DEPLOY_APPICATION_GROUP=girbil-staging
DEPLOY_BUCKET=girbil-server
DEPLOY_BUCKET_KEY=girbil-staging

set +e
aws deploy get-application --application-name $DEPLOY_APPICATION
if [ $? -ne 0 ]; then
  set -e
  echo "No application named $DEPLOY_APPICATION found. Trying to create a new one"
  aws deploy create-application --application-name $DEPLOY_APPICATION
else
  set -e
  echo "Application named $DEPLOY_APPICATION already exists. Skipping creation."
fi

set +e
aws deploy get-deployment-group \
  --application-name $DEPLOY_APPICATION \
  --deployment-group-name $DEPLOY_APPICATION_GROUP
if [ $? -ne 0 ]; then
  set -e
  echo "No deployment group named $DEPLOY_APPICATION_GROUP found. Trying to create a new one"
  aws deploy create-deployment-group \
    --application-name $DEPLOY_APPICATION \
    --deployment-group-name $DEPLOY_APPICATION_GROUP \
    --deployment-config-name CodeDeployDefault.OneAtATime \
    --service-role-arn codedeploy-service-role
else
  set -e
  echo "Deployment group named $DEPLOY_APPICATION_GROUP already exists. Skipping creation."
fi

aws deploy push \
  --application-name $DEPLOY_APPICATION \
  --source . \
  --s3-location s3://$DEPLOY_BUCKET/$DEPLOY_BUCKET_KEY.zip

ID=$(aws deploy create-deployment \
       --application-name $DEPLOY_APPICATION \
       --deployment-group-name $DEPLOY_APPICATION_GROUP \
       --deployment-config-name CodeDeployDefault.OneAtATime \
       --ignore-application-stop-failures \
       --s3-location bucket=$DEPLOY_BUCKET,bundleType=zip,key=$DEPLOY_BUCKET_KEY.zip \
       --description "Ignore ApplicationStop failures due to broken script" \
       --output text \
       --query '[deploymentId]')

STATUS=$(aws deploy get-deployment \
          --deployment-id $ID \
          --output text \
          --query '[deploymentInfo.status]')

while [[ $STATUS == "Created" || $STATUS == "InProgress" || $STATUS == "Pending" ]]; do
  echo "Status: $STATUS..."
  STATUS=$(aws deploy get-deployment \
            --deployment-id $ID \
            --output text \
            --query '[deploymentInfo.status]')
  sleep 5
done

if [[ $STATUS == "Failed" ]]; then
  echo "Deployment failed!"
  aws deploy get-deployment --deployment-id $ID
  exit 1
else
  echo "Deployment finished."
  aws deploy get-deployment --deployment-id $ID
fi