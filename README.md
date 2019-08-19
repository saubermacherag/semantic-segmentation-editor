# Semantic Segmentation Editor - TUG/pinkrobin Edition
For original README.md see source of this fork.

## Run locally
### Install Docker
https://runnable.com/docker/install-docker-on-windows-10
### Configure
* copy the .env-default file and name it .env
* Modify values in .env to your needs
* Run `docker-compose up`

This is how it works on Windows with `docker-compose`.
`docker-compose.yml` not tested on other OS's.

+## Notes
+The data folders in the `.docker/input_img/` folder are expected to contain user directories. Otherwise the labeltool will display nothing but the menu bar. For example the images for user *user-12345* must be placed into `.docker/input_img/user-12345`. This is not a bug, but a security feature as no user should be able to browse and edit another user's folder.
