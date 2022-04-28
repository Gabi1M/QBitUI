<p align="center">
  <img src="https://user-images.githubusercontent.com/45296166/165736862-8c71571c-9347-4c2d-8c7e-80aa64b4ef1a.png" />
</p>

# QBitUI

Minimalist web interface for qBitTorrent.
Implemented using `React`, `Typescript` and `Mantine`.

# Features

- Torrent management: `Add`, `Pause`, `Resume`, `Force download`, `Recheck`, `Delete`, `Set category`, `Set tags`
- Basic qBitTorrent preferences management
- Category manager: Add new categories, edit and delete existing ones
- Tag manager: Add new tags and delete existing ones
- Torrent filtering on: `Name`, `State`, `Category`, `Tags`
- Transfer info overview for the active session
- Torrent pagination
- Light / Dark theme
- Support for multiple languages: English and Romanian so far
- Responsive mobile interface

# Screenshots

`Home page`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039247-d66c2410-b904-416c-8a48-671bc3fe3853.png" />
<img width="500" src="https://user-images.githubusercontent.com/45296166/163039412-c8bc3fe4-45ab-45bb-be8a-abb32e213e38.png" />

`Login page`

<img width="500" src="https://user-images.githubusercontent.com/45296166/164405640-98b69da7-2423-426c-acdf-b2e256d92cfb.png" />


`Add torrents modal`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039421-2f467656-c1bf-4516-b9e6-3f72ce514315.png" />

`WebUI settings modal`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039430-8e0eb193-6829-4a81-a25b-075b62f75579.png" />

`qBitTorrent preferences modal`

<img width="500" src="https://user-images.githubusercontent.com/45296166/164405398-41646759-09b1-41a7-8201-53a314626014.png" />

`Categories modal`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039443-ff0de2d1-dd83-46ed-8021-30d775f7b4f9.png" />

`Tags modal`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039446-3d7326e9-8fa9-4496-a3dd-2b9302d1b177.png" />

`Side drawer with general information + filters`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039450-14a1afdf-c772-48cd-a788-5864de3a3b1d.png" />

`Light theme`

<img width="500" src="https://user-images.githubusercontent.com/45296166/163039456-f3ddf4e3-9249-4818-ab5f-66d292072437.png" />

# Next steps

- Add support for the majority of qBitTorrent's settings
- Add support for displaying torrent details, trackers, files etc.
- Add support for many more languages

# Developing

- Clone the repo
- `yarn install` to install the dependencies
- Set the env var `REACT_APP_API_URL` to qBitTorrent's URL
- `yarn start` to start the development server

# Building

Just run `yarn build` and the built files will be generated in the `build` directory.

# Deploying

Running `yarn deploy` will build the app and copy the resulted files in the specified location (e.g. the configured qBitTorrent webui path)

# Contributions

Suggestions and improvements are most welcome
If you'd like to contribute, open an `Issue` or a `Pull Request` 😊

# Credits

- [qBitTorrent](https://www.qbittorrent.org/)
- [Mantine](https://mantine.dev/)
- [VueTorrent](https://github.com/WDaan/VueTorrent) for some inspiration
