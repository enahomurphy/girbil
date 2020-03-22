#!/bin/bash -eo pipefail

aws deploy push \
  --application-name $DEPLOY_APPLICATION \
  --source . \
  --s3-location s3://$DEPLOY_BUCKET/$DEPLOY_BUCKET_KEY.zip