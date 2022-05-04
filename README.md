<p align="center">
  <img src="https://user-images.githubusercontent.com/45296166/165736862-8c71571c-9347-4c2d-8c7e-80aa64b4ef1a.png" />
</p>

# QBitUI

Minimalist web interface for qBitTorrent.
Implemented using `React`, `Typescript` and `Mantine`.

# Features

- Torrent management: `Add`, `Pause`, `Resume`, `Force download`, `Recheck`, `Delete`, `Set category`, `Set tags`
- Selection management
- Management of the majority of qBittorrent's preferences
- Add new categories, edit and delete existing ones
- Add new tags and delete existing ones
- Torrent filtering on: `Name`, `State`, `Category`, `Tags`
- Transfer info overview for the active session
- Torrent pagination
- Light / Dark theme
- Support for multiple languages: English and Romanian so far
- Responsive mobile interface
- Basic torrent display badge customization

# Screenshots

<img src="https://user-images.githubusercontent.com/45296166/166058565-cf818641-2efc-4480-8833-b736928de434.png" />

|                                    |                                    |                                    |
| :--------------------------------: | :--------------------------------: | :--------------------------------: |
| ![](https://user-images.githubusercontent.com/45296166/166058574-e0c2ac1a-9396-440d-9cd4-d9a1b6230282.png) | ![](https://user-images.githubusercontent.com/45296166/166058584-5df98771-ee13-4f0e-a649-66953cbf3464.png)| ![](https://user-images.githubusercontent.com/45296166/166058599-a022b2ff-1c1f-434e-9a86-602528506433.png) |
| ![](https://user-images.githubusercontent.com/45296166/166058609-0a8bb2e7-d0f0-4888-90d8-d54e9cb9f3e7.png) | ![](https://user-images.githubusercontent.com/45296166/166058870-42189e34-5a3b-492f-a46a-cb7879c86626.png) | ![](https://user-images.githubusercontent.com/45296166/166058871-d1daa5df-4c6e-41ed-8faf-9b1f7c62d962.png) |
| ![](https://user-images.githubusercontent.com/45296166/166058886-bc0ee9ea-c8e8-40ca-a008-57c651183fac.png) | ![](https://user-images.githubusercontent.com/45296166/166058866-3ea44abf-ab05-4a30-9075-4d38a944d08b.png) | ![](https://user-images.githubusercontent.com/45296166/166058749-1ea6425b-b572-40d3-9596-ab649277456a.png) |
| ![](https://user-images.githubusercontent.com/45296166/166058876-14029a33-12cc-475d-8b4b-a595386fa31b.png) | ![](https://user-images.githubusercontent.com/45296166/166058879-8b74861f-aa16-46d7-a6a1-2b480bb26da4.png) | ![](https://user-images.githubusercontent.com/45296166/166058882-2a3baa2b-ef41-4e82-a3af-58cad4185ecd.png) |

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
- [SectorLabs](https://sectorlabs.ro)
