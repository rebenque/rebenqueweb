#!/bin/bash
VAR=1;
if [ -z "$1" ]
then
  echo "\$1 is empty"
else
  echo "\$1 is NOT empty"
  cd $1
  ls | cat -n | while read n f; do mv -n "$f" "$n.jpg"; done 
  cd ..
fi
