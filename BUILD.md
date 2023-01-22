# Build

## Ubuntu
```
mkdir -p build/conan && cd build/conan
conan install ../.. --build missing -pr:b=debug -pr:h=debug
conan install ../.. --build missing -pr:b=release -pr:h=release
cd ../..
cmake --preset release-ninja
cmake --build --preset release
```

## Windows (pwsh)
```
mkdir build\conan && cd build\conan
conan install ../.. --build missing -pr:b=debug -pr:h=debug
conan install ../.. --build missing -pr:b=release -pr:h=release
cd ..\..
cmake --preset release-vs22
cmake --build --preset release
```