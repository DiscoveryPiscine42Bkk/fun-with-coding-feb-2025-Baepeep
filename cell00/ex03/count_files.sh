#!/bin/bash

count=$(find . -maxdepth 1 ( -type f -o -type d ) | wc -l)
echo "$count$"
