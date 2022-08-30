<p align="center">
  <img src="https://user-images.githubusercontent.com/45296166/165736862-8c71571c-9347-4c2d-8c7e-80aa64b4ef1a.png" />
</p>

# QBitUI

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Gabi1M/QBitUI/tree/master.svg?style=svg&circle-token=0f38055040690d5c0343cc67fc83f955a6d28227)](https://dl.circleci.com/status-badge/redirect/gh/Gabi1M/QBitUI/tree/master)

Minimalist web interface for qBitTorrent.
Implemented using `React`, `Typescript` and `Mantine`.

# Features

- Torrent management: `Add`, `Pause`, `Resume`, `Force download`, `Recheck`, `Delete`, `Set category`, `Set tags`
- Torrent filtering on: `Name`, `State`, `Category`, `Tags`
- Torrent pagination
- Properties, content and trackers overview for torrents
- Selection management
- Management of the majority of qBittorrent's preferences
- Add new categories, edit and delete existing ones
- Add new tags and delete existing ones
- Transfer info overview for the active session
- Light / Dark theme
- Support for multiple languages: English and Romanian so far
- Responsive mobile interface

# Screenshots

![Main page](https://user-images.githubusercontent.com/45296166/179348180-0806741f-e1dc-43a5-bc74-cc53bf5c469c.png)


|             |             |               |
|    :----:   |    :----:   |     :----:    |
| ![Main page selection](https://user-images.githubusercontent.com/45296166/179348202-cdd2e5ad-4b26-4854-9454-b37ec2da772e.png) | ![Add torrent modal](https://user-images.githubusercontent.com/45296166/179348209-dfe3effc-8edd-4e1a-883a-990147814c05.png) | ![Web UI Settings](https://user-images.githubusercontent.com/45296166/179348211-503eb4a7-d54c-46f6-a502-785c68975817.png) |
| ![Preferences modal](https://user-images.githubusercontent.com/45296166/179348212-09bee62e-8675-4d96-805d-473db70002ba.png) | ![Categories modal](https://user-images.githubusercontent.com/45296166/179348214-47146a6e-d2b2-44f2-b5a9-147564e1d57a.png) | ![Create category modal](https://user-images.githubusercontent.com/45296166/179348215-ca6c7725-8838-4ae6-8a96-39d95e823dcb.png) |
| ![Tags modal](https://user-images.githubusercontent.com/45296166/179348216-9e6a8030-7625-4de7-8ebb-e00c96b69190.png) | ![Create tag modal](https://user-images.githubusercontent.com/45296166/179348218-78542fe3-c667-4e5b-97d0-d4329a971cb4.png) | ![Server state modal](https://user-images.githubusercontent.com/45296166/179348220-e78b7c42-d35d-4770-adab-9f11bc534710.png) |
| ![Torrent properties modal](https://user-images.githubusercontent.com/45296166/179348222-92731afb-4cb5-4d75-993b-84733faf183a.png) | ![Torrent contents modal](https://user-images.githubusercontent.com/45296166/179348223-09099a09-312c-45fe-8772-037a2f7b7e46.png) | ![Torrent trackers modal](https://user-images.githubusercontent.com/45296166/179348224-274b91db-8165-42fa-ae09-ce1e59dcfb50.png) |

# Next steps

- Add support for managing trackers and individual files for torrents
- Add support for many more languages

# Developing

- Clone the repo
- `yarn install` to install the dependencies
- Set the env var `VITE_API_URL` to qBitTorrent's URL
- `yarn start` to start the development server
- `yarn fix` to apply linting and formatting rules

# Building

Just run `yarn build` and the built files will be generated in the `build` directory.

# Deploying

Running `yarn deploy` will build the app and copy the resulted files in the specified location (e.g. the configured qBitTorrent webui path). The path is taken from the `DEPLOY_PATH` environment variable

# Contributions

Suggestions and improvements are most welcome
If you'd like to contribute, open an `Issue` or a `Pull Request` 😊

# Credits

- [qBitTorrent](https://www.qbittorrent.org/)
- [Mantine](https://mantine.dev/)
- [Vite](https://vitejs.dev/)
- [VueTorrent](https://github.com/WDaan/VueTorrent) for some inspiration
- [SectorLabs](https://sectorlabs.ro)