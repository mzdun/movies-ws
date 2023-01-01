
## [0.4.1](https://github.com/mzdun/movies-ws/compare/v0.4.0...v0.4.1) (2023-01-01)

### Bug Fixes

- add and adapt to clang-tidy ([7438a59](https://github.com/mzdun/movies-ws/commit/7438a599bef1f270adfe1447aa4db2cdb0b7c679))

## [0.4.0](https://github.com/mzdun/movies-ws/compare/v0.3.0...v0.4.0) (2022-12-16)

### New Features

- shutdown on SIGTERM ([aa34512](https://github.com/mzdun/movies-ws/commit/aa34512245dcc99b9445f11127b3396c38bc3440))
- setup proper arguments ([fa8a9a3](https://github.com/mzdun/movies-ws/commit/fa8a9a324d642906c0f7413418dc4848fae53273))

## [0.3.0](https://github.com/mzdun/movies-ws/compare/v0.2.0...v0.3.0) (2022-12-15)

### New Features

- observe directories on Linux ([5d0135c](https://github.com/mzdun/movies-ws/commit/5d0135c4931aaccdedf304d11ead92bdaefac0e0))
- prefixable service ([a5e9b4f](https://github.com/mzdun/movies-ws/commit/a5e9b4f0b45ce06b4706ac18df80876860156be2))
- build on Ubuntu ([d69474f](https://github.com/mzdun/movies-ws/commit/d69474fa53c5353f2aa9e525d7fe08dbfc319dd4))
- add TMDb link ([267744c](https://github.com/mzdun/movies-ws/commit/267744cae58a900cadbc50c3f0374bc759fb0d32))
- **jsapi**: defer socket connection ([74c5218](https://github.com/mzdun/movies-ws/commit/74c5218cb03f85881da65319720e3c4afc3fbad8))
- print handling stats ([f9d53ba](https://github.com/mzdun/movies-ws/commit/f9d53bae69e3811c2c64ae66935f7f05cccb0e34))
- attach translations to sessions ([237ffbc](https://github.com/mzdun/movies-ws/commit/237ffbc84023b516cb9b357cbde7b730c97a5518))
- expand langs to fallback languages ([8332aea](https://github.com/mzdun/movies-ws/commit/8332aea6d1cb7af3273e836e7fe1f92b07a90b07))
- support MKV files ([4e58344](https://github.com/mzdun/movies-ws/commit/4e583449ec22fb0645795a46d8e7469521d4be39))
- reconnect on request ([8f79260](https://github.com/mzdun/movies-ws/commit/8f79260c8982ff8d443dbb9279ef9a59354094b9))
- expose is_episode as an on-of ([5c54014](https://github.com/mzdun/movies-ws/commit/5c5401422375436a34250a165ea6948b7b524b69))
- update to latest movies/json libs ([e01f883](https://github.com/mzdun/movies-ws/commit/e01f8838320a428749241ea19d94157577c34551))
- update to movies w/translatable strings ([baea0e4](https://github.com/mzdun/movies-ws/commit/baea0e438cc2432f1d00be1d8361bbdb3428e0bd))

### Bug Fixes

- locate xdg-open on $PATH ([d02544b](https://github.com/mzdun/movies-ws/commit/d02544b0e627e170ea395cc3174e456805f14f2f))
- phase 2 of code cleanup ([f1e8cee](https://github.com/mzdun/movies-ws/commit/f1e8ceec5ca7d43c6ba949a0a924824feb989e6b))
- clean compilation on Windows ([62f7a19](https://github.com/mzdun/movies-ws/commit/62f7a19e0467094f2b953a2274f075f0bf0730a5))
- update to flatter movie_data ([28d5073](https://github.com/mzdun/movies-ws/commit/28d50739a7a6b952050faf00fee9ccadffe4e3b2))

## [0.2.0](https://github.com/mzdun/movies-ws/compare/v0.1.0...v0.2.0) (2022-11-17)

### New Features

- switch to single web socket w/default proto ([d164709](https://github.com/mzdun/movies-ws/commit/d1647095bc55786adf1f5608ac717f66badd8915))
- use lws' default protocol feature ([85b0c6f](https://github.com/mzdun/movies-ws/commit/85b0c6f64cb3c1ccf98111c688d2a1eee90b34af))
- serve multiple static directories ([fcdd693](https://github.com/mzdun/movies-ws/commit/fcdd6931a6d7b3a65e5c6644e7436196273036ad))
- **win32**: observe directory changes ([877aca3](https://github.com/mzdun/movies-ws/commit/877aca3d579880aa9958173ab6a18b9a1af26b7b))
- broadcast db change event ([e2ed68c](https://github.com/mzdun/movies-ws/commit/e2ed68c39d2931f5f49e5d475b5fade4b565110a))
- extract async part of DB loading ([2cf839e](https://github.com/mzdun/movies-ws/commit/2cf839e25492c5bfc939c8a142df5dd14b32705e))
- add read locks to const methods ([66e6376](https://github.com/mzdun/movies-ws/commit/66e6376c54738d8a02471bc10227c536e05f02af))
- add links between episodes ([d2116f2](https://github.com/mzdun/movies-ws/commit/d2116f207bf97e3af140c2a0c551314ff9105483))
- experimental local playback (xdg-open pending) ([bf7fe57](https://github.com/mzdun/movies-ws/commit/bf7fe5785be611a23647c3a888792b793901c71b))
- suport /filter/:cat/:term links ([599a96b](https://github.com/mzdun/movies-ws/commit/599a96b971f658bd597f1e27a1fb1a75b609d23b))
- read episode references ([72211b4](https://github.com/mzdun/movies-ws/commit/72211b4db78f1ca4ee4d2cfafaa972aa2638b779))
- add tokens filter ([6116370](https://github.com/mzdun/movies-ws/commit/6116370b401317355f118a855a15d28563cb6863))
- add localizable messages ([f2385b6](https://github.com/mzdun/movies-ws/commit/f2385b644a4d7ae093fc68dff01509d8e9d757b1))
- implement requests ([c39b33a](https://github.com/mzdun/movies-ws/commit/c39b33ae1455ea68a7059c5cd55871885b3dd830))

### Bug Fixes

- turn IMDb link into icon button ([43c3275](https://github.com/mzdun/movies-ws/commit/43c32756ad347e00630fd90c8aecdda4f0ef2702))
- serve static files from bin/site ([bf42c66](https://github.com/mzdun/movies-ws/commit/bf42c6640f6ba19f21234fbecd24f2277e483a71))
- using non-storing db load ([8e3bdc7](https://github.com/mzdun/movies-ws/commit/8e3bdc745999d56489499c379c06d022c7cd01a9))
- cleanup names ([01bc300](https://github.com/mzdun/movies-ws/commit/01bc30080bdaad477bca0509ef6116d86c7a9b43))
- smooth event usage ([9da0b42](https://github.com/mzdun/movies-ws/commit/9da0b42c52c4c67d37e5975b0d1f50c0757ebb3d))
