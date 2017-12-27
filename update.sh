#!/bin/bash

DEFAULT=document
CATEGORY=${1:-$DEFAULT}
git add . && git commit -m "Update $CATEGORY contents"
git push -u origin master
