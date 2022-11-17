
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
