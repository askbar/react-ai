#!/usr/bin/env bash
set -euo pipefail

timestamp=`date --rfc-3339=seconds`
echo "Starting deploy.sh at ${timestamp}"
unzip dist.zip
source ./etc/application.conf
if [ -e ./etc/${ACCOUNT}.conf ]
then
    source ./etc/${ACCOUNT}.conf
else
    echo No configuration found, using default configuration
    source ./etc/default.conf
fi
source build/version.conf

echo "Application name is ${AppName}"
export ViewerProtocolPolicy=allow-all

if [ -z ${SiteDomain} ]; then
    SiteDomain=123.www.${ACCOUNT#"topdanmark-"}.topdanmark.cloud
    echo SiteDomain was not found, generating SiteDomain to ${SiteDomain}
fi

############Find bucket###############

bucket_name=$(aws s3 ls | grep hybridappbucket | cut -d' ' -f3)
path_with_version="s3://${bucket_name}/hybridapps/${AppName}/${VERSION}"
path_for_latest="s3://${bucket_name}/hybridapps/${AppName}/latest"
max_age=${MaxAge:-"94608000"} # == 3 years

echo "Copying ${TargetFolder} to ${bucket_name}"
aws s3 sync "${TargetFolder}" "${path_with_version}" --acl public-read --cache-control "max-age=${max_age}" --metadata-directive REPLACE --quiet

# Deployment in latest folder should only be done in dev environments for two reasons:
# 1) We do not want to publish links to links to applications that are not yet published in Hippo
# 2) Latest folder is not cached by CloudFront or the browser. We want caching in production.
if [ "${AlsoDeployToLatestFolder:-false}" = "true" ]
then
  echo "Deploying in latest folder"
  echo "Will be available on https://${SiteDomain}/hybridapps/${AppName}/latest/${IndexFile}"
  aws s3 sync "${TargetFolder}" "${path_for_latest}" --delete --acl public-read --cache-control "max-age=0" --metadata-directive REPLACE --quiet
  echo ""
else
  echo "Not deploying in latest folder"
fi

url="https://${SiteDomain}/hybridapps/${AppName}/${VERSION}/${IndexFile}"

echo "Getting ${url}"
echo ""

curl --fail -Is ${url}
