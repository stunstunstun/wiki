## Overview

Github Integrations

## CI

Service | URL 
----|----
Travis CI | https://travis-ci.org/getting_started 

### Travis CI

### Gitlab을 통해 CI

- gitlab.com

> **.gitlab-ci.yml**

````yml
image: java:8-jdk

stages:
  - build
  - test
  - deploy

before_script:
#  - echo `pwd` # debug
#  - echo "$CI_BUILD_NAME, $CI_BUILD_REF_NAME $CI_BUILD_STAGE" # debug
  - export GRADLE_USER_HOME=`pwd`/.gradle

cache:
  paths:
    - .gradle/wrapper
    - .gradle/caches

build:
  stage: build
  script:
    - ./gradlew assemble
  artifacts:
    paths:
      - build/libs/*.jar
    expire_in: 1 week
  only:
    - master

test:
  stage: test
  script:
    - ./gradlew check

deploy:
  stage: deploy
  script:
    - ./deploy

after_script:
  - echo "End CI"
````

### CD

Service | URL 
----|----
Codeship | https://codeship.com/features 
AWS Code Deploy | https://aws.amazon.com/en/codedeploy/


## References
- iOS Application CI : https://www.objc.io/issues/6-build-tools/travis-ci/
