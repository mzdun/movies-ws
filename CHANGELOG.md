
## [0.11.0](https://github.com/mzdun/movies-ws/compare/v0.10.1...v0.11.0) (2023-01-22)

### New Features

- align with movies' string_type helpers ([5bf0f7e](https://github.com/mzdun/movies-ws/commit/5bf0f7e94b60a1604c91702e80de7f430ad16271))

### Bug Fixes

- lookup only "top" language resources ([b2db22c](https://github.com/mzdun/movies-ws/commit/b2db22cc4b5f7deb0d2a321b853e759fb514e6e6))
- adapt to new way of using conan and cmake ([299d736](https://github.com/mzdun/movies-ws/commit/299d7361e3f1da73f50d5303cd83dcf26a884640))
- adapt to newest version of movies ([ec09311](https://github.com/mzdun/movies-ws/commit/ec09311d870797cea15895d007df1a9cca867d4a))
- remove deleted file reference ([cd86404](https://github.com/mzdun/movies-ws/commit/cd864042016673e4d6f868921fa78830f72c7df8))
- ignore metadata directory on synology ([9666193](https://github.com/mzdun/movies-ws/commit/966619301b11149c7b0c3b97b328184887769922))
- allow video_marker.start to be zero ([7c93e8e](https://github.com/mzdun/movies-ws/commit/7c93e8e8a90ce6a53a3ec62c4d5e170ef8ee7691))
- switch to movie_info.idl ([91a8d71](https://github.com/mzdun/movies-ws/commit/91a8d71dfb5f8b647fd13564eecddac13bdd16f4))

## [0.10.1](https://github.com/mzdun/movies-ws/compare/v0.10.0...v0.10.1) (2023-01-09)

### Bug Fixes

- take video offset for correct video ([2f9fff3](https://github.com/mzdun/movies-ws/commit/2f9fff3acee610aafdaee0d47ee2403ed58c9c92))

## [0.10.0](https://github.com/mzdun/movies-ws/compare/v0.9.0...v0.10.0) (2023-01-09)

### New Features

- extend logger usage ([4f3ee28](https://github.com/mzdun/movies-ws/commit/4f3ee28b51444c2905e936a4d3c7d9e307edd7d8))
- introduce activity log ([d7d7b3f](https://github.com/mzdun/movies-ws/commit/d7d7b3fafec1fe2b9f80f5fc386ecd8695dfb1aa))
- setup session/client ID ([3f8bc16](https://github.com/mzdun/movies-ws/commit/3f8bc16030da55b94073b07022ab26912396416d))

### Bug Fixes

- store client id in session name ([afe3289](https://github.com/mzdun/movies-ws/commit/afe3289ce176a69a00cb3a246b903e4962e14843))

## [0.9.0](https://github.com/mzdun/movies-ws/compare/v0.8.0...v0.9.0) (2023-01-08)

### New Features

- always prefer json markers over db ([92f4acb](https://github.com/mzdun/movies-ws/commit/92f4acb60b49f62e76b2bc6ed8852246cc41f74a))
- store video markers ([0c8d3dd](https://github.com/mzdun/movies-ws/commit/0c8d3dd68937539766ac7f5ca0f2070d6508c682))

### Bug Fixes

- backtrack to_underlying on GCC ([a542557](https://github.com/mzdun/movies-ws/commit/a54255786cb3ee29920a5ce72d0a9eceb177fe92))
- switch to video_info from libmovies ([8674665](https://github.com/mzdun/movies-ws/commit/86746655b6810be40d4c4d1ff8facecd4c79d465))
- unite sql, c++ and proto names ([6a45e16](https://github.com/mzdun/movies-ws/commit/6a45e16c10e0096343195a507decab7179ac8a6b))
- add chapter to marker types ([f9f9274](https://github.com/mzdun/movies-ws/commit/f9f927438f2c2eedf1fbb2841781eeb9c500d720))
- build on Linux ([362a6f4](https://github.com/mzdun/movies-ws/commit/362a6f42d23051a148a1d269f9000f2bfa90023d))

## [0.8.0](https://github.com/mzdun/movies-ws/compare/v0.7.0...v0.8.0) (2023-01-05)

### New Features

- store watch offset and histogram ([2ad6910](https://github.com/mzdun/movies-ws/commit/2ad69109b6475f6eb77c267155a239b38e745398))
- expose video metadata ([a2da589](https://github.com/mzdun/movies-ws/commit/a2da5898ffeaf264cc066978ddb8377510dbbe41))

### Bug Fixes

- build on Linux ([9024513](https://github.com/mzdun/movies-ws/commit/9024513b6195b4f156ab72d646fb279e5d2074ac))
- block server from broadcasting beyond main() ([b0330d4](https://github.com/mzdun/movies-ws/commit/b0330d4847cf4ec1aff0c0a30518b8688599f942))

## [0.7.0](https://github.com/mzdun/movies-ws/compare/v0.6.0...v0.7.0) (2023-01-04)

### New Features

- link plugins from config ([0bde3a4](https://github.com/mzdun/movies-ws/commit/0bde3a49ebaf6a5ffa13f1c3585edfc8f5aa3e91))

### Bug Fixes

- install plugin configs ([2b47f93](https://github.com/mzdun/movies-ws/commit/2b47f93da73d4c883faab40d14e7f27699d45264))
- send update if only plugins change ([fc2893c](https://github.com/mzdun/movies-ws/commit/fc2893c3ff0abaebb73e96ee15bfa9f65c60046f))

## [0.6.0](https://github.com/mzdun/movies-ws/compare/v0.5.1...v0.6.0) (2023-01-03)

### New Features

- patch summary internal links ([fe5a5d6](https://github.com/mzdun/movies-ws/commit/fe5a5d6e35c19217e2bc760a943ceefcaa97b2c4))
- find links for crew references ([23c2300](https://github.com/mzdun/movies-ws/commit/23c2300016f951c52060699a9dc73c37a718504b))
- send app title and filter titles ([c45bb59](https://github.com/mzdun/movies-ws/commit/c45bb5994ad57817f55f4baf1be8595d1785a87c))

### Bug Fixes

- notice updated summaries and taglines ([82c2642](https://github.com/mzdun/movies-ws/commit/82c264273c80cc18266bb65dffce8ca3793367f1))
- prefer default translatable over en/en-US ([50e4f25](https://github.com/mzdun/movies-ws/commit/50e4f253302cd9e4bace5afa1c7d181e7ced7391))
- un-warp strings for react app ([ba5b885](https://github.com/mzdun/movies-ws/commit/ba5b885468357eb9888f744e6567f34c5786e803))

## [0.5.1](https://github.com/mzdun/movies-ws/compare/v0.5.0...v0.5.1) (2023-01-02)

### Bug Fixes

- allow port configuration ([3f83a43](https://github.com/mzdun/movies-ws/commit/3f83a435c4a0a06c38744c3b98868cf3e5ff5ec1))

## [0.5.0](https://github.com/mzdun/movies-ws/compare/v0.4.1...v0.5.0) (2023-01-02)

### New Features

- **posix**: replace start.sh with docker-start ([4a7d156](https://github.com/mzdun/movies-ws/commit/4a7d15681e6a508710de6057fa371652d2730235))
- extract startup code to separate library ([b9618ce](https://github.com/mzdun/movies-ws/commit/b9618ceeff598edfbb9d84fcd21a80705e6b9cac))

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
