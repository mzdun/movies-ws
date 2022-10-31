# Build

## Ubuntu
```
mkdir -p build/conan && cd build/conan
conan install ../.. --build missing -s build_type=Release
conan install ../.. --build missing -s build_type=Debug
cd ..
cmake .. -DCMAKE_BUILD_TYPE=Debug -G Ninja
ninja
```

## Windows (pwsh)
```
mkdir build\conan && cd build\conan
conan install ..\.. --build missing -s build_type=Release -s compiler.runtime=MT
conan install ..\.. --build missing -s build_type=Debug -s compiler.runtime=MTd
cd ..
cmake ..
```