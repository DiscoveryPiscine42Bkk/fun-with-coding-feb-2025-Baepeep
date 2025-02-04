#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No arguments supplied"
else

  for (( i=1; i<=3 && i<=$#; i++ )); do
    eval "echo \${$i}"
  done
fi


