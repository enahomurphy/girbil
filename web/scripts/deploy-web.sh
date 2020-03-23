# sudo cd web && yarn install && yarn build-prod

sudo yarn build-prod

sudo aws s3 sync dist/ s3://$GIRBIL_WEB_STAGING_S3_CLIENT

# Break the CloudFront cache
sudo aws cloudfront create-invalidation --distribution-id $GIRBIL_WEB_STAGING_CLOUNDFRONT_ID --paths "/*"