#!/bin/bash -eo pipefail
sudo yarn install

ID=$(aws deploy create-deployment \
       --application-name girbil \
       --deployment-group-name girbil-stagin \
       --deployment-config-name CodeDeployDefault.OneAtATime \
       --ignore-application-stop-failures \
       --s3-location bucket=girbil-server,bundleType=zip,key=girbil-staging.zip \
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