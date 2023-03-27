# Build

## Ubuntu
```
mkdir -p build/conan && cd build/conan
conan install ../.. --build missing -pr:b=debug -pr:h=debug
conan install ../.. --build missing -pr:b=release -pr:h=release
cd ../..
cmake --preset release-ninja
cmake --build --preset release --parallel
```

## Windows (pwsh)
```
mkdir build\conan && cd build\conan
conan install ../.. --build missing -pr:b=debug -pr:h=debug
conan install ../.. --build missing -pr:b=release -pr:h=release
cd ..\..
cmake --preset release-msbuild
cmake --build --preset release --parallel
```