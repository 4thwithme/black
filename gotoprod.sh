if [ -d ./dist ]; then rm -Rf ./dist; fi &&
mkdir dist &&
cp -R ./config ./dist &&
cp -R ./const ./dist &&
cp -R ./localStorage ./dist &&
cp -R ./config ./dist &&
cp -R ./middleware ./dist &&
cp -R ./models ./dist &&
cp -R ./routes ./dist &&
cp -R ./socket ./dist &&
cp -R ./utils ./dist &&
cp -R ./utils ./dist &&
cp ./index.js ./dist &&
cp ./tsconfig.json ./dist &&
cp ./package.json ./dist &&
cp ./yarn.lock ./dist &&
cp -R ./build/* ./dist;
