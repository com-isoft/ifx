# chmod +x iextsdk.sh

echo generate workspace
cd ..
sencha -sdk /usr/local/var/www/ext generate workspace ./iext
cd iext
cp ../iextsdk/ws.gitignore .gitignore

echo generate iext-locale
sencha generate package --type locale iext-locale
cp ../iextsdk/locale.json packages/local/iext-locale/package.json
cp ../iextsdk/package.gitignore packages/local/iext-locale/.gitignore
rm -r -f  packages/local/iext-locale/examples
rm -r -f  packages/local/iext-locale/sass

echo generate iext-theme-triton
sencha generate package --type theme iext-theme-triton
cp ../iextsdk/triton.json packages/local/iext-theme-triton/package.json
cp ../iextsdk/package.gitignore packages/local/iext-theme-triton/.gitignore
## rm -r -f  packages/local/iext-theme-triton/examples
## rm -r -f  packages/local/iext-theme-triton/sass/example

echo generate iext-theme-neptune
sencha generate package --type theme iext-theme-neptune
cp ../iextsdk/neptune.json packages/local/iext-theme-neptune/package.json
cp ../iextsdk/package.gitignore packages/local/iext-theme-neptune/.gitignore
## rm -r -f  packages/local/iext-theme-neptune/examples
## rm -r -f  packages/local/iext-theme-neptune/sass/example

echo generate iext-theme-crisp
sencha generate package --type theme iext-theme-crisp
cp ../iextsdk/crisp.json packages/local/iext-theme-crisp/package.json
cp ../iextsdk/package.gitignore packages/local/iext-theme-crisp/.gitignore
## rm -r -f  packages/local/iext-theme-crisp/examples
## rm -r -f  packages/local/iext-theme-crisp/sass/example

echo generate iext-core
sencha generate package --type code iext-core
cp ../iextsdk/core.json packages/local/iext-core/package.json
cp ../iextsdk/package.gitignore packages/local/iext-core/.gitignore
rm -r -f  packages/local/iext-core/examples
rm -r -f  packages/local/iext-core/sass

echo generate iext-classic
sencha generate package --type code iext-classic
cp ../iextsdk/classic.json packages/local/iext-classic/package.json
cp ../iextsdk/package.gitignore packages/local/iext-classic/.gitignore

echo generate classic examples
cd packages
cd local
cd iext-classic
sencha generate app -ext --classic app ./examples
## 删除app文件夹及文件，由git获取
rm -r -f  examples/app
cp ../../../../iextsdk/examples.json examples/app.json
cp ../../../../iextsdk/examples.gitignore examples/.gitignore
