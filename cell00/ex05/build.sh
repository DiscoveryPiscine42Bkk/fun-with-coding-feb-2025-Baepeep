if (($# == 0)); then
    echo "No arguments supplied"
    exit 1
fi

for i in "$@"; do
    if [ ! -d "ex$i" ]; then
        mkdir "ex$i"
    fi
done
