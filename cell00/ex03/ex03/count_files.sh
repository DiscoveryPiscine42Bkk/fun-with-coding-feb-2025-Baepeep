#!/bin/bash

count=$(find . -mindepth 1 | wc -l)
echo "$count"
